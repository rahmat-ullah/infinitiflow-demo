import mongoose, { Document, Schema } from 'mongoose';

export interface ITool extends Document {
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive' | 'coming_soon';
  featured: boolean;
  icon?: string;
  image?: string;
  url?: string;
  tags: string[];
  features: string[];
  pricing: {
    type: 'free' | 'paid' | 'freemium';
    price?: number;
    currency?: string;
  };
  stats?: {
    views: number;
    likes: number;
    users: number;
  };
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const toolSchema = new Schema<ITool>(
  {
    name: {
      type: String,
      required: [true, 'Tool name is required'],
      trim: true,
      maxlength: [100, 'Tool name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Tool description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'productivity',
        'design',
        'development',
        'marketing',
        'analytics',
        'automation',
        'communication',
        'finance',
        'other'
      ],
      default: 'other'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'coming_soon'],
      default: 'active'
    },
    featured: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: 'URL must be a valid web address'
      }
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    features: [{
      type: String,
      trim: true,
      maxlength: [200, 'Feature description cannot exceed 200 characters']
    }],
    pricing: {
      type: {
        type: String,
        enum: ['free', 'paid', 'freemium'],
        default: 'free'
      },
      price: {
        type: Number,
        min: [0, 'Price cannot be negative']
      },
      currency: {
        type: String,
        default: 'USD',
        uppercase: true,
        maxlength: [3, 'Currency code cannot exceed 3 characters']
      }
    },
    stats: {
      views: {
        type: Number,
        default: 0,
        min: [0, 'Views cannot be negative']
      },
      likes: {
        type: Number,
        default: 0,
        min: [0, 'Likes cannot be negative']
      },
      users: {
        type: Number,
        default: 0,
        min: [0, 'Users cannot be negative']
      }
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
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

// Indexes for better query performance
toolSchema.index({ category: 1, status: 1 });
toolSchema.index({ featured: -1, createdAt: -1 });
toolSchema.index({ tags: 1 });
toolSchema.index({ 'stats.views': -1 });

// Pre-save middleware to clean up tags
toolSchema.pre('save', function(next) {
  if (this.tags && this.tags.length > 0) {
    this.tags = this.tags
      .filter(tag => tag.trim() !== '')
      .map(tag => tag.toLowerCase().trim())
      .slice(0, 10); // Limit to 10 tags
  }
  next();
});

export const Tool = mongoose.model<ITool>('Tool', toolSchema); 