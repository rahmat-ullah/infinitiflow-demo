import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'textarea', 'select', 'multiselect', 'number', 'url', 'email'],
    required: true
  },
  placeholder: String,
  description: String,
  required: {
    type: Boolean,
    default: false
  },
  options: [String], // For select/multiselect fields
  validation: {
    min: Number,
    max: Number,
    pattern: String
  },
  defaultValue: mongoose.Schema.Types.Mixed,
  order: {
    type: Number,
    default: 0
  }
}, { _id: false });

const usageStatsSchema = new mongoose.Schema({
  totalUses: {
    type: Number,
    default: 0
  },
  uniqueUsers: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  lastUsed: Date,
  popularKeywords: [String],
  avgGenerationTime: Number,
  successRate: {
    type: Number,
    default: 100
  }
}, { _id: false });

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [100, 'Template name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Template description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  prompt: {
    type: String,
    required: [true, 'Template prompt is required']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'blog-writing',
      'social-media',
      'email-marketing',
      'advertising',
      'seo',
      'copywriting',
      'content-marketing',
      'product-descriptions',
      'press-releases',
      'video-scripts',
      'other'
    ]
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
  fields: [fieldSchema],
  outputFormat: {
    type: String,
    enum: ['text', 'html', 'markdown', 'json'],
    default: 'text'
  },
  defaultSettings: {
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
      min: 50,
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
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  usageStats: {
    type: usageStatsSchema,
    default: () => ({})
  },
  icon: {
    type: String,
    default: 'FileText'
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  estimatedTime: {
    type: Number, // in seconds
    default: 30
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  requiredPlan: {
    type: String,
    enum: ['free', 'basic', 'premium', 'enterprise'],
    default: 'free'
  },
  examples: [{
    title: String,
    input: mongoose.Schema.Types.Mixed,
    output: String,
    description: String
  }],
  relatedTemplates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  }],
  version: {
    type: String,
    default: '1.0.0'
  },
  changelog: [{
    version: String,
    changes: [String],
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
templateSchema.index({ category: 1 });
templateSchema.index({ type: 1 });
templateSchema.index({ creator: 1 });
templateSchema.index({ isPublic: 1, isActive: 1 });
templateSchema.index({ isPremium: 1 });
templateSchema.index({ isFeatured: 1 });
templateSchema.index({ tags: 1 });
templateSchema.index({ 'usageStats.totalUses': -1 });
templateSchema.index({ 'usageStats.averageRating': -1 });
templateSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Virtual properties
templateSchema.virtual('popularityScore').get(function() {
  // Calculate popularity based on usage, rating, and recency
  const usageWeight = this.usageStats.totalUses * 0.4;
  const ratingWeight = this.usageStats.averageRating * this.usageStats.totalRatings * 0.4;
  const recencyWeight = this.usageStats.lastUsed 
    ? Math.max(0, 30 - (Date.now() - this.usageStats.lastUsed) / (1000 * 60 * 60 * 24)) * 0.2
    : 0;
  
  return usageWeight + ratingWeight + recencyWeight;
});

templateSchema.virtual('effectivenessRating').get(function() {
  if (this.usageStats.totalRatings === 0) return 0;
  return Math.round(this.usageStats.averageRating * 2) / 2; // Round to nearest 0.5
});

// Pre-save middleware
templateSchema.pre('save', function(next) {
  // Sort fields by order
  if (this.isModified('fields')) {
    this.fields.sort((a, b) => a.order - b.order);
  }

  // Ensure required fields have validation
  this.fields.forEach(field => {
    if (field.required && !field.validation) {
      field.validation = {};
    }
  });

  next();
});

// Instance methods
templateSchema.methods.recordUse = function(userId) {
  this.usageStats.totalUses += 1;
  this.usageStats.lastUsed = new Date();
  
  // Update unique users count (simplified - in production, you might want to track this more accurately)
  if (this.usageStats.uniqueUsers === 0) {
    this.usageStats.uniqueUsers = 1;
  }
  
  return this.save();
};

templateSchema.methods.addRating = function(rating) {
  const currentTotal = this.usageStats.averageRating * this.usageStats.totalRatings;
  this.usageStats.totalRatings += 1;
  this.usageStats.averageRating = (currentTotal + rating) / this.usageStats.totalRatings;
  return this.save();
};

templateSchema.methods.generateContent = function(inputData, settings = {}) {
  // This method would integrate with AI service
  // For now, return a placeholder that would be replaced by actual AI integration
  let prompt = this.prompt;
  
  // Replace placeholders in prompt with actual input data
  this.fields.forEach(field => {
    const value = inputData[field.name] || field.defaultValue || '';
    const placeholder = `{{${field.name}}}`;
    prompt = prompt.replace(new RegExp(placeholder, 'g'), value);
  });

  const finalSettings = {
    ...this.defaultSettings,
    ...settings
  };

  return {
    prompt,
    settings: finalSettings,
    templateId: this._id
  };
};

templateSchema.methods.validateInput = function(inputData) {
  const errors = [];
  
  this.fields.forEach(field => {
    const value = inputData[field.name];
    
    // Check required fields
    if (field.required && (!value || value.toString().trim() === '')) {
      errors.push(`${field.label} is required`);
      return;
    }
    
    if (value !== undefined && value !== null && value !== '') {
      // Type validation
      if (field.type === 'number' && isNaN(value)) {
        errors.push(`${field.label} must be a number`);
      }
      
      if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        errors.push(`${field.label} must be a valid email`);
      }
      
      if (field.type === 'url' && !/^https?:\/\/.+/.test(value)) {
        errors.push(`${field.label} must be a valid URL`);
      }
      
      // Length validation
      if (field.validation) {
        if (field.validation.min && value.toString().length < field.validation.min) {
          errors.push(`${field.label} must be at least ${field.validation.min} characters`);
        }
        
        if (field.validation.max && value.toString().length > field.validation.max) {
          errors.push(`${field.label} must be no more than ${field.validation.max} characters`);
        }
        
        if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
          errors.push(`${field.label} format is invalid`);
        }
      }
    }
  });
  
  return errors;
};

templateSchema.methods.duplicate = function(newName) {
  const duplicated = new this.constructor({
    name: newName || `Copy of ${this.name}`,
    description: this.description,
    prompt: this.prompt,
    category: this.category,
    type: this.type,
    fields: this.fields.map(field => ({ ...field })),
    outputFormat: this.outputFormat,
    defaultSettings: { ...this.defaultSettings },
    tags: [...this.tags],
    creator: this.creator,
    isPublic: false, // Duplicates are private by default
    isPremium: this.isPremium,
    icon: this.icon,
    color: this.color,
    estimatedTime: this.estimatedTime,
    difficulty: this.difficulty,
    requiredPlan: this.requiredPlan,
    examples: this.examples.map(example => ({ ...example }))
  });
  
  return duplicated.save();
};

// Static methods
templateSchema.statics.getFeatured = function(limit = 10) {
  return this.find({ isFeatured: true, isActive: true, isPublic: true })
    .sort({ 'usageStats.totalUses': -1 })
    .limit(limit)
    .populate('creator', 'firstName lastName avatar');
};

templateSchema.statics.getPopular = function(limit = 10) {
  return this.find({ isActive: true, isPublic: true })
    .sort({ 'usageStats.totalUses': -1, 'usageStats.averageRating': -1 })
    .limit(limit)
    .populate('creator', 'firstName lastName avatar');
};

templateSchema.statics.getByCategory = function(category, limit = 20) {
  return this.find({ category, isActive: true, isPublic: true })
    .sort({ 'usageStats.totalUses': -1 })
    .limit(limit)
    .populate('creator', 'firstName lastName avatar');
};

templateSchema.statics.searchTemplates = function(query, filters = {}) {
  const searchQuery = {
    $text: { $search: query },
    isActive: true,
    isPublic: true,
    ...filters
  };
  
  return this.find(searchQuery)
    .sort({ score: { $meta: 'textScore' } })
    .populate('creator', 'firstName lastName avatar');
};

export default mongoose.model('Template', templateSchema);