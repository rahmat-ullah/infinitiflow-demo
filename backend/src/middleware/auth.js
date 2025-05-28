import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError, catchAsync } from './errorHandler.js';
import { logger } from '../utils/logger.js';

// Protect routes - verify JWT token
export const protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it exists
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id).select('+active');
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // 4) Check if user is active
  if (!currentUser.active) {
    return next(new AppError('Your account has been deactivated. Please contact support.', 401));
  }

  // 5) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Restrict to certain roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

// Check if user owns the resource or is admin
export const checkOwnership = (Model, resourceIdParam = 'id') => {
  return catchAsync(async (req, res, next) => {
    const resourceId = req.params[resourceIdParam];
    const resource = await Model.findById(resourceId);

    if (!resource) {
      return next(new AppError('Resource not found', 404));
    }

    // Admin can access any resource
    if (req.user.role === 'admin') {
      req.resource = resource;
      return next();
    }

    // Check if user owns the resource
    if (resource.user && resource.user.toString() !== req.user.id) {
      return next(new AppError('You can only access your own resources', 403));
    }

    req.resource = resource;
    next();
  });
};

// Optional authentication - doesn't throw error if no token
export const optionalAuth = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id).select('+active');
      
      if (currentUser && currentUser.active && !currentUser.changedPasswordAfter(decoded.iat)) {
        req.user = currentUser;
      }
    } catch (error) {
      // Invalid token, but we don't throw error for optional auth
      logger.warn('Invalid token in optional auth:', error.message);
    }
  }

  next();
});

// Rate limiting per user
export const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const userRequests = new Map();

  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user.id;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    if (userRequests.has(userId)) {
      const userRequestTimes = userRequests.get(userId).filter(time => time > windowStart);
      userRequests.set(userId, userRequestTimes);
    }

    // Get current user requests
    const currentRequests = userRequests.get(userId) || [];

    if (currentRequests.length >= maxRequests) {
      return next(new AppError(`Too many requests. Please try again later.`, 429));
    }

    // Add current request
    currentRequests.push(now);
    userRequests.set(userId, currentRequests);

    next();
  };
};

// Check subscription status
export const checkSubscription = (requiredPlan = 'free') => {
  return catchAsync(async (req, res, next) => {
    const user = req.user;

    if (!user.subscription || !user.subscription.isActive) {
      if (requiredPlan !== 'free') {
        return next(new AppError('Active subscription required for this feature', 402));
      }
    }

    const planHierarchy = { free: 0, basic: 1, premium: 2, enterprise: 3 };
    const userPlanLevel = planHierarchy[user.subscription?.plan || 'free'];
    const requiredPlanLevel = planHierarchy[requiredPlan];

    if (userPlanLevel < requiredPlanLevel) {
      return next(new AppError(`${requiredPlan} plan or higher required for this feature`, 402));
    }

    next();
  });
}; 