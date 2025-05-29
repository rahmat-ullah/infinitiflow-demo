import mongoose from 'mongoose';

const customerMetricSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['users', 'content', 'satisfaction', 'awards', 'global', 'roi'],
    index: true
  },
  order: {
    type: Number,
    default: 0,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true,
  collection: 'customerMetrics'
});

// Index for ordering
customerMetricSchema.index({ isActive: 1, order: 1 });

const CustomerMetric = mongoose.model('CustomerMetric', customerMetricSchema);

export default CustomerMetric; 