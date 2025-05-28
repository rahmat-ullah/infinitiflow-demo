import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';
import { sendEmail } from '../services/emailService.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const createSendToken = (user, statusCode, res, message = 'Success') => {
  const token = signToken(user._id);
  const refreshToken = user.generateRefreshToken();
  
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.cookie('jwt', token, cookieOptions);
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    refreshToken,
    data: {
      user
    }
  });
};

export const register = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { firstName, lastName, email, password, company } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User with this email already exists', 409));
  }

  // Create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    company
  });

  // Create free subscription
  await Subscription.create({
    user: user._id,
    plan: 'free'
  });

  // Generate email verification token
  const verifyToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Send verification email
  try {
    const verifyURL = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;
    await sendEmail({
      email: user.email,
      subject: 'Welcome to InfinitiFlow - Verify Your Email',
      template: 'emailVerification',
      data: {
        firstName: user.firstName,
        verifyURL
      }
    });

    logger.info(`Verification email sent to ${user.email}`);
  } catch (err) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });

    logger.error('Error sending verification email:', err);
    // Don't fail registration if email fails
  }

  createSendToken(user, 201, res, 'User registered successfully');
});

export const login = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { email, password } = req.body;

  // Find user and include password
  const user = await User.findOne({ email }).select('+password +active');

  // Check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    // Increment login attempts if user exists
    if (user) {
      await user.incLoginAttempts();
    }
    return next(new AppError('Incorrect email or password', 401));
  }

  // Check if account is locked
  if (user.isLocked) {
    return next(new AppError('Account temporarily locked due to too many failed login attempts', 423));
  }

  // Check if account is active
  if (!user.active) {
    return next(new AppError('Your account has been deactivated', 401));
  }

  // Reset login attempts on successful login
  if (user.loginAttempts && user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  // Update last login
  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res, 'Logged in successfully');
});

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.cookie('refreshToken', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // Don't reveal if email exists or not
    return res.status(200).json({
      status: 'success',
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send it to user's email
  try {
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'InfinitiFlow - Password Reset Request',
      template: 'passwordReset',
      data: {
        firstName: user.firstName,
        resetURL
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Password reset link sent to email'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    logger.error('Error sending password reset email:', err);
    return next(new AppError('There was an error sending the email. Try again later.', 500));
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Log the user in, send JWT
  createSendToken(user, 200, res, 'Password reset successfully');
});

export const verifyEmail = catchAsync(async (req, res, next) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully'
  });
});

export const resendVerification = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(200).json({
      status: 'success',
      message: 'If an account with that email exists, a verification email has been sent.'
    });
  }

  if (user.isEmailVerified) {
    return next(new AppError('Email is already verified', 400));
  }

  const verifyToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  try {
    const verifyURL = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;
    await sendEmail({
      email: user.email,
      subject: 'InfinitiFlow - Verify Your Email',
      template: 'emailVerification',
      data: {
        firstName: user.firstName,
        verifyURL
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Verification email sent'
    });
  } catch (err) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });

    logger.error('Error sending verification email:', err);
    return next(new AppError('There was an error sending the email. Try again later.', 500));
  }
});

export const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError('Refresh token is required', 400));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    if (decoded.type !== 'refresh') {
      return next(new AppError('Invalid token type', 401));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    if (!user.active) {
      return next(new AppError('Your account has been deactivated.', 401));
    }

    createSendToken(user, 200, res, 'Token refreshed successfully');
  } catch (error) {
    return next(new AppError('Invalid refresh token', 401));
  }
});

export const changePassword = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  // Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is incorrect.', 400));
  }

  // If so, update password
  user.password = req.body.password;
  await user.save();

  // Log user in, send JWT
  createSendToken(user, 200, res, 'Password changed successfully');
});

export const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('subscription');

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
}); 