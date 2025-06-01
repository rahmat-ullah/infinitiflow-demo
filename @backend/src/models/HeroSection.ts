import mongoose, { Document, Schema } from 'mongoose';

export interface IHeroSection extends Document {
  badge?: string;
  title: string;
  titleHighlight?: string; // For the highlighted part of the title
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    url: string;
    style: 'primary' | 'secondary' | 'outline';
    icon?: string;
  };
  secondaryCTA?: {
    text: string;
    url: string;
    style: 'primary' | 'secondary' | 'outline';
    icon?: string;
  };
  additionalInfo?: string; // For additional text like "No credit card required"
  heroImage?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  floatingElements?: Array<{
    text: string;
    type: 'badge' | 'indicator' | 'feature';
    position: string; // CSS position info or general position description
    color?: string;
    icon?: string;
  }>;
  stats?: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  theme?: {
    particles?: boolean;
    animations?: boolean;
    gradientEffects?: boolean;
  };
  isActive: boolean;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

const heroSectionSchema = new Schema<IHeroSection>(
  {
    badge: {
      type: String,
      trim: true,
      maxlength: [100, 'Badge text cannot exceed 100 characters']
    },
    title: {
      type: String,
      required: [true, 'Hero title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    titleHighlight: {
      type: String,
      trim: true,
      maxlength: [100, 'Title highlight cannot exceed 100 characters']
    },
    subtitle: {
      type: String,
      required: [true, 'Hero subtitle is required'],
      trim: true,
      maxlength: [300, 'Subtitle cannot exceed 300 characters']
    },
    description: {
      type: String,
      required: [true, 'Hero description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    primaryCTA: {
      text: {
        type: String,
        required: [true, 'Primary CTA text is required'],
        trim: true,
        maxlength: [50, 'CTA text cannot exceed 50 characters']
      },
      url: {
        type: String,
        required: [true, 'Primary CTA URL is required'],
        trim: true
      },
      style: {
        type: String,
        enum: ['primary', 'secondary', 'outline'],
        default: 'primary'
      },
      icon: {
        type: String,
        trim: true
      }
    },
    secondaryCTA: {
      text: {
        type: String,
        trim: true,
        maxlength: [50, 'CTA text cannot exceed 50 characters']
      },
      url: {
        type: String,
        trim: true
      },
      style: {
        type: String,
        enum: ['primary', 'secondary', 'outline'],
        default: 'outline'
      },
      icon: {
        type: String,
        trim: true
      }
    },
    additionalInfo: {
      type: String,
      trim: true,
      maxlength: [200, 'Additional info cannot exceed 200 characters']
    },
    heroImage: {
      type: String,
      trim: true
    },
    backgroundImage: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          if (!v) return true;
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
        },
        message: 'Background image must be a valid image URL'
      }
    },
    backgroundVideo: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          if (!v) return true;
          return /^https?:\/\/.+\.(mp4|webm|ogg)$/i.test(v);
        },
        message: 'Background video must be a valid video URL'
      }
    },
    floatingElements: [{
      text: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Floating element text cannot exceed 50 characters']
      },
      type: {
        type: String,
        required: true,
        enum: ['badge', 'indicator', 'feature'],
        default: 'badge'
      },
      position: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Position description cannot exceed 100 characters']
      },
      color: {
        type: String,
        trim: true
      },
      icon: {
        type: String,
        trim: true
      }
    }],
    stats: [{
      label: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Stat label cannot exceed 50 characters']
      },
      value: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'Stat value cannot exceed 20 characters']
      },
      description: {
        type: String,
        trim: true,
        maxlength: [100, 'Stat description cannot exceed 100 characters']
      }
    }],
    features: [{
      icon: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Icon name cannot exceed 50 characters']
      },
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Feature title cannot exceed 100 characters']
      },
      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Feature description cannot exceed 200 characters']
      }
    }],
    theme: {
      particles: {
        type: Boolean,
        default: false
      },
      animations: {
        type: Boolean,
        default: false
      },
      gradientEffects: {
        type: Boolean,
        default: false
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    version: {
      type: String,
      required: true,
      default: '1.0.0'
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Index for better query performance
heroSectionSchema.index({ isActive: 1, version: -1 });

// Ensure only one active hero section at a time
heroSectionSchema.pre('save', async function(next) {
  if (this.isActive && this.isNew) {
    // Deactivate all other hero sections when creating a new active one
    await mongoose.model('HeroSection').updateMany(
      { _id: { $ne: this._id } },
      { $set: { isActive: false } }
    );
  }
  next();
});

export const HeroSection = mongoose.model<IHeroSection>('HeroSection', heroSectionSchema); 