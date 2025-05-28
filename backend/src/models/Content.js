import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  prompt: String,
  settings: {
    model: String,
    temperature: Number,
    maxTokens: Number,
    tone: String,
    language: String
  }
}, { _id: true });

const analyticsSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  lastViewedAt: Date,
  avgRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 }
}, { _id: false });

const seoMetaSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: [String],
  metaTitle: String,
  metaDescription: String,
  slug: String
}, { _id: false });

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Content title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  type: {
    type: String,
    required: true,
    enum: [
      'blog-post',
      'social-media-post',
      'email',
      'ad-copy',
      'product-description',
      'press-release',
      'newsletter',
      'landing-page',
      'seo-content',
      'video-script',
      'podcast-script',
      'other'
    ]
  },
  category: {
    type: String,
    enum: [
      'marketing',
      'sales',
      'content',
      'social-media',
      'email-marketing',
      'seo',
      'advertising',
      'education',
      'entertainment',
      'other'
    ],
    default: 'content'
  },
  platform: {
    type: String,
    enum: [
      'blog',
      'facebook',
      'instagram',
      'twitter',
      'linkedin',
      'youtube',
      'tiktok',
      'email',
      'website',
      'google-ads',
      'facebook-ads',
      'other'
    ]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  prompt: {
    type: String,
    required: true
  },
  generationSettings: {
    model: {
      type: String,
      default: 'gpt-4'
    },
    temperature: {
      type: Number,
      min: 0,
      max: 2,
      default: 0.7
    },
    maxTokens: {
      type: Number,
      min: 1,
      max: 4000,
      default: 1000
    },
    tone: {
      type: String,
      enum: ['professional', 'casual', 'friendly', 'formal', 'humorous', 'persuasive', 'informative'],
      default: 'professional'
    },
    language: {
      type: String,
      default: 'en'
    },
    targetAudience: String,
    keywords: [String]
  },
  versions: [versionSchema],
  currentVersion: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'deleted'],
    default: 'draft'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  analytics: {
    type: analyticsSchema,
    default: () => ({})
  },
  seoMeta: seoMetaSchema,
  isPublic: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  wordCount: {
    type: Number,
    default: 0
  },
  readingTime: {
    type: Number, // in minutes
    default: 0
  },
  publishedAt: Date,
  scheduledFor: Date,
  expiresAt: Date,
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['viewer', 'editor', 'admin'],
      default: 'viewer'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  },
  parentContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  },
  aiMetadata: {
    confidence: Number,
    originalityScore: Number,
    toxicityScore: Number,
    sentimentScore: Number,
    readabilityScore: Number,
    seoScore: Number
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
contentSchema.index({ user: 1, createdAt: -1 });
contentSchema.index({ type: 1 });
contentSchema.index({ category: 1 });
contentSchema.index({ status: 1 });
contentSchema.index({ tags: 1 });
contentSchema.index({ isPublic: 1 });
contentSchema.index({ 'analytics.views': -1 });
contentSchema.index({ 'analytics.likes': -1 });
contentSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Virtual properties
contentSchema.virtual('currentVersionContent').get(function() {
  if (this.versions && this.versions.length > 0) {
    return this.versions[this.currentVersion] || this.versions[this.versions.length - 1];
  }
  return { content: this.content };
});

contentSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

contentSchema.virtual('isScheduled').get(function() {
  return this.scheduledFor && this.scheduledFor > new Date();
});

// Pre-save middleware
contentSchema.pre('save', function(next) {
  // Calculate word count
  if (this.isModified('content')) {
    this.wordCount = this.content.split(/\s+/).filter(word => word.length > 0).length;
    this.readingTime = Math.ceil(this.wordCount / 200); // Assuming 200 words per minute
  }

  // Add to versions if content changed
  if (this.isModified('content') && !this.isNew) {
    this.versions.push({
      content: this.content,
      prompt: this.prompt,
      settings: this.generationSettings
    });
    this.currentVersion = this.versions.length - 1;
  }

  // Set published date
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Instance methods
contentSchema.methods.addView = function() {
  this.analytics.views += 1;
  this.analytics.lastViewedAt = new Date();
  return this.save();
};

contentSchema.methods.addLike = function() {
  this.analytics.likes += 1;
  return this.save();
};

contentSchema.methods.addShare = function() {
  this.analytics.shares += 1;
  return this.save();
};

contentSchema.methods.addRating = function(rating) {
  const currentTotal = this.analytics.avgRating * this.analytics.totalRatings;
  this.analytics.totalRatings += 1;
  this.analytics.avgRating = (currentTotal + rating) / this.analytics.totalRatings;
  return this.save();
};

contentSchema.methods.revertToVersion = function(versionIndex) {
  if (this.versions[versionIndex]) {
    const version = this.versions[versionIndex];
    this.content = version.content;
    this.prompt = version.prompt;
    this.generationSettings = { ...this.generationSettings, ...version.settings };
    this.currentVersion = versionIndex;
    return this.save();
  }
  throw new Error('Version not found');
};

contentSchema.methods.duplicate = function() {
  const duplicated = new this.constructor({
    title: `Copy of ${this.title}`,
    content: this.content,
    type: this.type,
    category: this.category,
    platform: this.platform,
    user: this.user,
    template: this.template,
    prompt: this.prompt,
    generationSettings: this.generationSettings,
    tags: [...this.tags],
    seoMeta: this.seoMeta ? { ...this.seoMeta } : undefined,
    folder: this.folder
  });
  return duplicated.save();
};

// Static methods
contentSchema.statics.getPopularContent = function(limit = 10) {
  return this.find({ isPublic: true, status: 'published' })
    .sort({ 'analytics.views': -1, 'analytics.likes': -1 })
    .limit(limit)
    .populate('user', 'firstName lastName avatar');
};

contentSchema.statics.getTrendingContent = function(days = 7, limit = 10) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return this.find({
    isPublic: true,
    status: 'published',
    createdAt: { $gte: since }
  })
    .sort({ 'analytics.views': -1, createdAt: -1 })
    .limit(limit)
    .populate('user', 'firstName lastName avatar');
};

contentSchema.statics.searchContent = function(query, filters = {}) {
  const searchQuery = {
    $text: { $search: query },
    ...filters
  };
  
  return this.find(searchQuery)
    .sort({ score: { $meta: 'textScore' } })
    .populate('user', 'firstName lastName avatar');
};

export default mongoose.model('Content', contentSchema);