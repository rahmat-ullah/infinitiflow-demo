import mongoose from 'mongoose';

const testimonialResultSchema = new mongoose.Schema({
  metric: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  improvement: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { _id: false });

const testimonialImplementationSchema = new mongoose.Schema({
  duration: {
    type: String,
    required: true
  },
  challenges: [{
    type: String
  }],
  solutions: [{
    type: String
  }]
}, { _id: false });

const testimonialSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  quote: {
    type: String,
    required: true,
    maxlength: 1000
  },
  longQuote: {
    type: String,
    required: true,
    maxlength: 2000
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  verified: {
    type: Boolean,
    default: true,
    index: true
  },
  videoUrl: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        return v === null || /^https?:\/\/.+/.test(v);
      },
      message: 'Video URL must be a valid URL or null'
    }
  },
  results: [testimonialResultSchema],
  tags: [{
    type: String,
    trim: true,
    index: true
  }],
  useCase: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  companySize: {
    type: String,
    required: true,
    enum: [
      'Small business (1-100 employees)',
      'Mid-market (100-500 employees)',
      'Enterprise (500+ employees)'
    ],
    index: true
  },
  implementation: testimonialImplementationSchema
}, {
  timestamps: true,
  collection: 'testimonials'
});

// Indexes for better query performance
testimonialSchema.index({ featured: 1, date: -1 });
testimonialSchema.index({ industry: 1, rating: -1 });
testimonialSchema.index({ verified: 1, featured: 1 });
testimonialSchema.index({ tags: 1 });
testimonialSchema.index({ 'name': 'text', 'company': 'text', 'quote': 'text' });

// Virtual for hasVideo
testimonialSchema.virtual('hasVideo').get(function() {
  return this.videoUrl !== null && this.videoUrl !== undefined;
});

// Ensure virtual fields are serialized
testimonialSchema.set('toJSON', { virtuals: true });
testimonialSchema.set('toObject', { virtuals: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial; 