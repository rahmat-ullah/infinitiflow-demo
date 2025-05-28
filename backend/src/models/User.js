import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const subscriptionSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'enterprise'],
    default: 'free'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'free'],
    default: 'free'
  }
}, { _id: false });

const usageStatsSchema = new mongoose.Schema({
  contentGenerated: {
    type: Number,
    default: 0
  },
  wordsGenerated: {
    type: Number,
    default: 0
  },
  templatesUsed: {
    type: Number,
    default: 0
  },
  apiCalls: {
    type: Number,
    default: 0
  },
  lastResetDate: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const preferencesSchema = new mongoose.Schema({
  language: {
    type: String,
    default: 'en'
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  emailNotifications: {
    marketing: { type: Boolean, default: true },
    updates: { type: Boolean, default: true },
    security: { type: Boolean, default: true }
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light'
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  avatar: {
    url: String,
    publicId: String
  },
  company: {
    name: String,
    position: String,
    size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-1000', '1000+']
    },
    industry: String
  },
  subscription: {
    type: subscriptionSchema,
    default: () => ({})
  },
  usageStats: {
    type: usageStatsSchema,
    default: () => ({})
  },
  preferences: {
    type: preferencesSchema,
    default: () => ({})
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
  lastLoginAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    select: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ 'subscription.plan': 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// Virtual properties
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.virtual('subscriptionStatus').get(function() {
  if (!this.subscription.isActive) return 'inactive';
  if (this.subscription.endDate && this.subscription.endDate < new Date()) return 'expired';
  return 'active';
});

// Pre-save middleware
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12);
  
  // Set passwordChangedAt
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

// Instance methods
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

userSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
};

// Handle login attempts and account locking
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Update usage statistics
userSchema.methods.updateUsageStats = function(updates) {
  const stats = this.usageStats;
  Object.keys(updates).forEach(key => {
    if (stats[key] !== undefined) {
      stats[key] += updates[key];
    }
  });
  return this.save();
};

// Check if user has reached usage limits
userSchema.methods.hasReachedLimit = function(limitType) {
  const limits = {
    free: { contentGenerated: 10, wordsGenerated: 5000, apiCalls: 50 },
    basic: { contentGenerated: 100, wordsGenerated: 50000, apiCalls: 500 },
    premium: { contentGenerated: 500, wordsGenerated: 250000, apiCalls: 2500 },
    enterprise: { contentGenerated: -1, wordsGenerated: -1, apiCalls: -1 } // Unlimited
  };

  const userLimits = limits[this.subscription.plan] || limits.free;
  const userStats = this.usageStats;

  // Check if it's a new month, reset stats if needed
  const now = new Date();
  const lastReset = new Date(userStats.lastResetDate);
  if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
    userStats.contentGenerated = 0;
    userStats.wordsGenerated = 0;
    userStats.templatesUsed = 0;
    userStats.apiCalls = 0;
    userStats.lastResetDate = now;
  }

  const limit = userLimits[limitType];
  if (limit === -1) return false; // Unlimited
  
  return userStats[limitType] >= limit;
};

export default mongoose.model('User', userSchema); 