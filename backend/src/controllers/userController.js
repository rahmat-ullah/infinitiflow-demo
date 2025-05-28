import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

export const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  // Fields that are allowed to be updated
  const allowedFields = ['firstName', 'lastName', 'email', 'company', 'preferences'];
  const updateData = {};

  Object.keys(req.body).forEach(key => {
    if (allowedFields.includes(key)) {
      updateData[key] = req.body[key];
    }
  });

  // Check if email is being changed and if it already exists
  if (updateData.email && updateData.email !== req.user.email) {
    const existingUser = await User.findOne({ email: updateData.email });
    if (existingUser) {
      return next(new AppError('Email already in use', 409));
    }
    // If email is changed, mark as unverified
    updateData.isEmailVerified = false;
  }

  const user = await User.findByIdAndUpdate(req.user.id, updateData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

export const updatePreferences = catchAsync(async (req, res, next) => {
  const { preferences } = req.body;

  if (!preferences || typeof preferences !== 'object') {
    return next(new AppError('Preferences object is required', 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { preferences },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Preferences updated successfully',
    data: {
      user
    }
  });
});

export const getUsageStats = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      usageStats: user.usageStats,
      subscription: user.subscription,
      limits: user.hasReachedLimit ? {
        content: user.hasReachedLimit('contentGenerated'),
        words: user.hasReachedLimit('wordsGenerated'),
        api: user.hasReachedLimit('apiCalls')
      } : {}
    }
  });
});

export const uploadAvatar = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an image file', 400));
  }

  // This is a placeholder - in production you would upload to Cloudinary
  // For now, we'll just simulate the upload
  const avatarData = {
    url: `http://localhost:5000/uploads/avatars/${req.file.filename}`,
    publicId: `avatar_${req.user.id}_${Date.now()}`
  };

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: avatarData },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Avatar uploaded successfully',
    data: {
      user
    }
  });
});

export const removeAvatar = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $unset: { avatar: '' } },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Avatar removed successfully',
    data: {
      user
    }
  });
});

export const deleteAccount = catchAsync(async (req, res, next) => {
  // Soft delete - set active to false
  await User.findByIdAndUpdate(req.user.id, { active: false });

  logger.info(`User account deleted: ${req.user.email}`);

  res.status(200).json({
    status: 'success',
    message: 'Account deleted successfully'
  });
}); 