import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for individual feature item
export interface IFeature {
  title: string;
  description: string;
  icon: string;
  isVisible: boolean;
  order: number;
}

// Interface for feature section document with instance methods
export interface IFeatureSection extends Document {
  sectionTitle: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
  badge?: {
    text: string;
    icon?: string;
  };
  features: IFeature[];
  isActive: boolean;
  version: string;
  maxFeatures?: number;
  displayMode: 'grid' | 'list' | 'carousel';
  theme?: {
    showIcons: boolean;
    cardStyle: 'default' | 'minimal' | 'featured';
    columns: number;
  };
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  activate(): Promise<IFeatureSection>;
  getVisibleFeatures(): IFeature[];
}

// Interface for model static methods
export interface IFeatureSectionModel extends Model<IFeatureSection> {
  findActive(): Promise<IFeatureSection | null>;
  createVersion(baseData: Partial<IFeatureSection>, newVersion: string): Promise<IFeatureSection>;
}

// Feature item sub-schema
const FeatureSchema = new Schema<IFeature>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  icon: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    default: 'Star'
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    required: true,
    min: 0
  }
});

// Badge sub-schema
const BadgeSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  icon: {
    type: String,
    trim: true,
    maxlength: 50
  }
});

// Theme sub-schema
const ThemeSchema = new Schema({
  showIcons: {
    type: Boolean,
    default: true
  },
  cardStyle: {
    type: String,
    enum: ['default', 'minimal', 'featured'],
    default: 'default'
  },
  columns: {
    type: Number,
    min: 1,
    max: 6,
    default: 3
  }
});

// Main feature section schema
const FeatureSectionSchema = new Schema<IFeatureSection>({
  sectionTitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  sectionSubtitle: {
    type: String,
    trim: true,
    maxlength: 300
  },
  sectionDescription: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  badge: {
    type: BadgeSchema,
    required: false
  },
  features: {
    type: [FeatureSchema],
    required: true,
    validate: {
      validator: function(features: IFeature[]) {
        return features.length > 0 && features.length <= 20;
      },
      message: 'Features array must contain between 1 and 20 features'
    }
  },
  isActive: {
    type: Boolean,
    default: false
  },
  version: {
    type: String,
    required: true,
    trim: true,
    match: /^\d+\.\d+\.\d+$/
  },
  maxFeatures: {
    type: Number,
    min: 1,
    max: 20,
    default: 6
  },
  displayMode: {
    type: String,
    enum: ['grid', 'list', 'carousel'],
    default: 'grid'
  },
  theme: {
    type: ThemeSchema,
    default: () => ({
      showIcons: true,
      cardStyle: 'default',
      columns: 3
    })
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes for performance
FeatureSectionSchema.index({ isActive: 1 });
FeatureSectionSchema.index({ version: 1 });
FeatureSectionSchema.index({ createdAt: -1 });

// Pre-save middleware to ensure only one active section
FeatureSectionSchema.pre('save', async function(next) {
  if (this.isActive && this.isModified('isActive')) {
    await mongoose.model('FeatureSection').updateMany(
      { _id: { $ne: this._id } },
      { isActive: false }
    );
  }
  next();
});

// Instance methods
FeatureSectionSchema.methods.activate = async function() {
  await mongoose.model('FeatureSection').updateMany({}, { isActive: false });
  this.isActive = true;
  return this.save();
};

FeatureSectionSchema.methods.getVisibleFeatures = function() {
  return this.features
    .filter((feature: IFeature) => feature.isVisible)
    .sort((a: IFeature, b: IFeature) => a.order - b.order)
    .slice(0, this.maxFeatures);
};

// Static methods
FeatureSectionSchema.statics.findActive = function() {
  return this.findOne({ isActive: true });
};

FeatureSectionSchema.statics.createVersion = async function(baseData: Partial<IFeatureSection>, newVersion: string) {
  const existingSection = await this.findOne({ version: newVersion });
  if (existingSection) {
    throw new Error(`Version ${newVersion} already exists`);
  }
  
  const newSection = new this({
    ...baseData,
    version: newVersion,
    isActive: false
  });
  
  return newSection.save();
};

export const FeatureSection = mongoose.model<IFeatureSection, IFeatureSectionModel>('FeatureSection', FeatureSectionSchema); 