import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for testimonial document with instance methods
export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating?: number;
  location?: string;
  industry?: string;
  companySize?: string;
  videoUrl?: string;
  featured: boolean;
  active: boolean;
  displayOrder: number;
  tags: string[];
  dateSubmitted?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  activate(): Promise<ITestimonial>;
  deactivate(): Promise<ITestimonial>;
  feature(): Promise<ITestimonial>;
  unfeature(): Promise<ITestimonial>;
}

// Interface for model static methods
export interface ITestimonialModel extends Model<ITestimonial> {
  findActive(): Promise<ITestimonial[]>;
  findFeatured(): Promise<ITestimonial[]>;
  findByCompany(company: string): Promise<ITestimonial[]>;
  findByIndustry(industry: string): Promise<ITestimonial[]>;
  findByRating(minRating: number): Promise<ITestimonial[]>;
  getRandomTestimonials(limit?: number): Promise<ITestimonial[]>;
  getStats(): Promise<{
    total: number;
    active: number;
    featured: number;
    avgRating: number;
    byIndustry: Array<{ _id: string; count: number; avgRating: number }>;
  }>;
}

// Main testimonial schema
const TestimonialSchema = new Schema<ITestimonial>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  role: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  quote: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  industry: {
    type: String,
    trim: true,
    maxlength: 50
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-1000', '1000+'],
    trim: true
  },
  videoUrl: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 30
  }],
  dateSubmitted: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes for performance
TestimonialSchema.index({ active: 1, displayOrder: 1 });
TestimonialSchema.index({ featured: 1, displayOrder: 1 });
TestimonialSchema.index({ company: 1 });
TestimonialSchema.index({ industry: 1 });
TestimonialSchema.index({ rating: -1 });
TestimonialSchema.index({ name: 'text', company: 'text', quote: 'text' });

// Instance methods
TestimonialSchema.methods.activate = async function(): Promise<ITestimonial> {
  this.active = true;
  return this.save();
};

TestimonialSchema.methods.deactivate = async function(): Promise<ITestimonial> {
  this.active = false;
  return this.save();
};

TestimonialSchema.methods.feature = async function(): Promise<ITestimonial> {
  this.featured = true;
  return this.save();
};

TestimonialSchema.methods.unfeature = async function(): Promise<ITestimonial> {
  this.featured = false;
  return this.save();
};

// Static methods
TestimonialSchema.statics.findActive = function() {
  return this.find({ active: true })
    .sort({ displayOrder: 1, createdAt: -1 });
};

TestimonialSchema.statics.findFeatured = function() {
  return this.find({ featured: true, active: true })
    .sort({ displayOrder: 1, createdAt: -1 });
};

TestimonialSchema.statics.findByCompany = function(company: string) {
  return this.find({ 
    company: { $regex: company, $options: 'i' }, 
    active: true 
  }).sort({ createdAt: -1 });
};

TestimonialSchema.statics.findByIndustry = function(industry: string) {
  return this.find({ 
    industry: { $regex: industry, $options: 'i' }, 
    active: true 
  }).sort({ rating: -1, createdAt: -1 });
};

TestimonialSchema.statics.findByRating = function(minRating: number) {
  return this.find({ 
    rating: { $gte: minRating }, 
    active: true 
  }).sort({ rating: -1, createdAt: -1 });
};

TestimonialSchema.statics.getRandomTestimonials = function(limit = 3) {
  return this.aggregate([
    { $match: { active: true } },
    { $sample: { size: limit } }
  ]);
};

TestimonialSchema.statics.getStats = async function() {
  const [stats] = await this.aggregate([
    {
      $facet: {
        totalStats: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              active: { $sum: { $cond: ['$active', 1, 0] } },
              featured: { $sum: { $cond: ['$featured', 1, 0] } },
              avgRating: { $avg: '$rating' }
            }
          }
        ],
        industryStats: [
          { $match: { active: true, industry: { $exists: true, $ne: '' } } },
          {
            $group: {
              _id: '$industry',
              count: { $sum: 1 },
              avgRating: { $avg: '$rating' }
            }
          },
          { $sort: { count: -1 } }
        ]
      }
    }
  ]);

  const totalStats = stats.totalStats[0] || {
    total: 0,
    active: 0,
    featured: 0,
    avgRating: 0
  };

  return {
    ...totalStats,
    byIndustry: stats.industryStats
  };
};

export const Testimonial = mongoose.model<ITestimonial, ITestimonialModel>('Testimonial', TestimonialSchema); 