import mongoose from 'mongoose';

const planFeaturesSchema = new mongoose.Schema({
  contentLimit: { type: Number, default: -1 }, // -1 for unlimited
  wordsLimit: { type: Number, default: -1 },
  templatesAccess: { type: Boolean, default: true },
  premiumTemplates: { type: Boolean, default: false },
  apiAccess: { type: Boolean, default: false },
  collaborators: { type: Number, default: 0 },
  prioritySupport: { type: Boolean, default: false },
  customBranding: { type: Boolean, default: false },
  analytics: { type: Boolean, default: false },
  exportOptions: [String],
  integrations: [String]
}, { _id: false });

const billingHistorySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  invoiceId: String,
  stripePaymentIntentId: String,
  paymentMethod: String,
  description: String,
  paidAt: Date,
  nextBillingDate: Date
}, { timestamps: true });

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'enterprise'],
    default: 'free'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'past_due', 'trialing'],
    default: 'active'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  nextBillingDate: Date,
  cancelledAt: Date,
  cancelReason: String,
  trialStart: Date,
  trialEnd: Date,
  
  // Stripe integration
  stripeCustomerId: {
    type: String,
    index: true
  },
  stripeSubscriptionId: {
    type: String,
    index: true
  },
  stripePriceId: String,
  stripeProductId: String,
  
  // Pricing
  price: {
    amount: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    interval: { type: String, enum: ['month', 'year'], default: 'month' }
  },
  
  // Features based on plan
  features: {
    type: planFeaturesSchema,
    default: () => ({})
  },
  
  // Usage tracking
  currentUsage: {
    contentGenerated: { type: Number, default: 0 },
    wordsGenerated: { type: Number, default: 0 },
    apiCalls: { type: Number, default: 0 },
    templatesUsed: { type: Number, default: 0 },
    collaboratorsActive: { type: Number, default: 0 }
  },
  
  // Billing
  billingHistory: [billingHistorySchema],
  
  // Additional metadata
  metadata: {
    source: String, // Where subscription was created
    coupon: String,
    discountPercent: Number,
    referralCode: String,
    upgradeFrom: String,
    notes: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
subscriptionSchema.index({ user: 1 });
subscriptionSchema.index({ plan: 1 });
subscriptionSchema.index({ status: 1 });
subscriptionSchema.index({ stripeCustomerId: 1 });
subscriptionSchema.index({ stripeSubscriptionId: 1 });
subscriptionSchema.index({ nextBillingDate: 1 });
subscriptionSchema.index({ endDate: 1 });

// Virtual properties
subscriptionSchema.virtual('isExpired').get(function() {
  return this.endDate && this.endDate < new Date();
});

subscriptionSchema.virtual('daysUntilExpiry').get(function() {
  if (!this.endDate) return null;
  const diffTime = this.endDate - new Date();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

subscriptionSchema.virtual('isTrialing').get(function() {
  const now = new Date();
  return this.trialStart && this.trialEnd && now >= this.trialStart && now <= this.trialEnd;
});

subscriptionSchema.virtual('usagePercentages').get(function() {
  const features = this.features;
  const usage = this.currentUsage;
  
  return {
    content: features.contentLimit === -1 ? 0 : (usage.contentGenerated / features.contentLimit) * 100,
    words: features.wordsLimit === -1 ? 0 : (usage.wordsGenerated / features.wordsLimit) * 100,
    collaborators: features.collaborators === 0 ? 0 : (usage.collaboratorsActive / features.collaborators) * 100
  };
});

// Pre-save middleware
subscriptionSchema.pre('save', function(next) {
  // Set plan features based on plan type
  if (this.isModified('plan')) {
    this.features = this.getPlanFeatures(this.plan);
  }
  
  // Update status based on dates
  const now = new Date();
  if (this.endDate && this.endDate < now && this.status === 'active') {
    this.status = 'inactive';
    this.isActive = false;
  }
  
  next();
});

// Instance methods
subscriptionSchema.methods.getPlanFeatures = function(planType) {
  const planFeatures = {
    free: {
      contentLimit: 10,
      wordsLimit: 5000,
      templatesAccess: true,
      premiumTemplates: false,
      apiAccess: false,
      collaborators: 0,
      prioritySupport: false,
      customBranding: false,
      analytics: false,
      exportOptions: ['txt'],
      integrations: []
    },
    basic: {
      contentLimit: 100,
      wordsLimit: 50000,
      templatesAccess: true,
      premiumTemplates: true,
      apiAccess: false,
      collaborators: 2,
      prioritySupport: false,
      customBranding: false,
      analytics: true,
      exportOptions: ['txt', 'docx', 'pdf'],
      integrations: ['zapier']
    },
    premium: {
      contentLimit: 500,
      wordsLimit: 250000,
      templatesAccess: true,
      premiumTemplates: true,
      apiAccess: true,
      collaborators: 10,
      prioritySupport: true,
      customBranding: true,
      analytics: true,
      exportOptions: ['txt', 'docx', 'pdf', 'html'],
      integrations: ['zapier', 'slack', 'hubspot']
    },
    enterprise: {
      contentLimit: -1,
      wordsLimit: -1,
      templatesAccess: true,
      premiumTemplates: true,
      apiAccess: true,
      collaborators: -1,
      prioritySupport: true,
      customBranding: true,
      analytics: true,
      exportOptions: ['txt', 'docx', 'pdf', 'html', 'csv'],
      integrations: ['zapier', 'slack', 'hubspot', 'salesforce', 'custom']
    }
  };
  
  return planFeatures[planType] || planFeatures.free;
};

subscriptionSchema.methods.canUseFeature = function(featureName) {
  return this.features[featureName] === true || this.features[featureName] === -1;
};

subscriptionSchema.methods.hasReachedLimit = function(limitType) {
  const limit = this.features[limitType + 'Limit'];
  const current = this.currentUsage[limitType + 'Generated'] || this.currentUsage[limitType];
  
  if (limit === -1) return false; // Unlimited
  return current >= limit;
};

subscriptionSchema.methods.updateUsage = function(usageType, amount = 1) {
  if (!this.currentUsage[usageType]) {
    this.currentUsage[usageType] = 0;
  }
  this.currentUsage[usageType] += amount;
  return this.save();
};

subscriptionSchema.methods.resetUsage = function() {
  this.currentUsage = {
    contentGenerated: 0,
    wordsGenerated: 0,
    apiCalls: 0,
    templatesUsed: 0,
    collaboratorsActive: 0
  };
  return this.save();
};

subscriptionSchema.methods.addBillingRecord = function(billingData) {
  this.billingHistory.push(billingData);
  return this.save();
};

subscriptionSchema.methods.cancel = function(reason) {
  this.status = 'cancelled';
  this.isActive = false;
  this.cancelledAt = new Date();
  this.cancelReason = reason;
  return this.save();
};

subscriptionSchema.methods.reactivate = function() {
  this.status = 'active';
  this.isActive = true;
  this.cancelledAt = undefined;
  this.cancelReason = undefined;
  return this.save();
};

// Static methods
subscriptionSchema.statics.getActiveSubscriptions = function() {
  return this.find({ isActive: true, status: 'active' })
    .populate('user', 'firstName lastName email');
};

subscriptionSchema.statics.getExpiringSubscriptions = function(days = 7) {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  
  return this.find({
    isActive: true,
    endDate: { $lte: futureDate, $gte: new Date() }
  }).populate('user', 'firstName lastName email');
};

subscriptionSchema.statics.getRevenueStats = function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        'billingHistory.paidAt': {
          $gte: startDate,
          $lte: endDate
        },
        'billingHistory.status': 'paid'
      }
    },
    {
      $unwind: '$billingHistory'
    },
    {
      $match: {
        'billingHistory.paidAt': {
          $gte: startDate,
          $lte: endDate
        },
        'billingHistory.status': 'paid'
      }
    },
    {
      $group: {
        _id: '$plan',
        totalRevenue: { $sum: '$billingHistory.amount' },
        subscriptionCount: { $sum: 1 },
        averageRevenue: { $avg: '$billingHistory.amount' }
      }
    }
  ]);
};

export default mongoose.model('Subscription', subscriptionSchema); 