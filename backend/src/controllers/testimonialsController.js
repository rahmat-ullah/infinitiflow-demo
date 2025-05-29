import { catchAsync } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';
import Testimonial from '../models/Testimonial.js';
import CustomerMetric from '../models/CustomerMetric.js';

// Get all testimonials with filtering
export const getAllTestimonials = catchAsync(async (req, res, next) => {
  const { 
    industry, 
    featured, 
    verified, 
    companySize, 
    rating, 
    hasVideo,
    tag,
    sortBy = 'date',
    order = 'desc',
    page = 1,
    limit = 10
  } = req.query;
  
  // Build query filter
  const filter = {};
  
  if (industry && industry !== 'all') {
    filter.industry = industry;
  }
  
  if (featured === 'true') {
    filter.featured = true;
  }
  
  if (verified === 'true') {
    filter.verified = true;
  }
  
  if (companySize) {
    filter.companySize = companySize;
  }
  
  if (rating) {
    filter.rating = { $gte: parseInt(rating) };
  }
  
  if (hasVideo === 'true') {
    filter.videoUrl = { $ne: null };
  }
  
  if (tag) {
    filter.tags = { $regex: tag, $options: 'i' };
  }
  
  // Build sort criteria
  const sortCriteria = {};
  switch (sortBy) {
    case 'date':
      sortCriteria.date = order === 'asc' ? 1 : -1;
      break;
    case 'rating':
      sortCriteria.rating = order === 'asc' ? 1 : -1;
      break;
    case 'name':
      sortCriteria.name = order === 'asc' ? 1 : -1;
      break;
    case 'company':
      sortCriteria.company = order === 'asc' ? 1 : -1;
      break;
    default:
      sortCriteria.date = -1;
  }
  
  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;
  
  try {
    // Get testimonials with pagination
    const testimonials = await Testimonial.find(filter)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    // Get total count for pagination
    const total = await Testimonial.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);
    
    logger.info(`Fetched ${testimonials.length} testimonials from database`, {
      industry,
      featured,
      verified,
      total,
      page: pageNum,
      limit: limitNum
    });

    res.status(200).json({
      status: 'success',
      results: testimonials.length,
      pagination: {
        page: pageNum,
        pages: totalPages,
        total,
        limit: limitNum
      },
      data: {
        testimonials
      }
    });
  } catch (error) {
    logger.error('Error fetching testimonials from database:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch testimonials'
    });
  }
});

// Get single testimonial
export const getTestimonial = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const testimonial = await Testimonial.findOne({ id }).lean();
    
    if (!testimonial) {
      return res.status(404).json({
        status: 'error',
        message: 'Testimonial not found'
      });
    }

    logger.info(`Fetched testimonial from database: ${testimonial.name}`, { id });

    res.status(200).json({
      status: 'success',
      data: {
        testimonial
      }
    });
  } catch (error) {
    logger.error('Error fetching testimonial from database:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch testimonial'
    });
  }
});

// Get customer metrics
export const getCustomerMetrics = catchAsync(async (req, res, next) => {
  try {
    const metrics = await CustomerMetric.find({ isActive: true })
      .sort({ order: 1 })
      .lean();

    logger.info(`Fetched ${metrics.length} customer metrics from database`);

    res.status(200).json({
      status: 'success',
      results: metrics.length,
      data: {
        metrics
      }
    });
  } catch (error) {
    logger.error('Error fetching customer metrics from database:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch customer metrics'
    });
  }
});

// Get testimonial filters/options
export const getTestimonialFilters = catchAsync(async (req, res, next) => {
  try {
    // Get unique values from database
    const [industries, companySizes, tags, useCases] = await Promise.all([
      Testimonial.distinct('industry'),
      Testimonial.distinct('companySize'),
      Testimonial.distinct('tags'),
      Testimonial.distinct('useCase')
    ]);
    
    const filters = {
      industries: industries.map(industry => ({ id: industry, label: industry })),
      companySizes: companySizes.map(size => ({ id: size, label: size })),
      tags: tags.map(tag => ({ id: tag, label: tag })),
      useCases: useCases.map(useCase => ({ id: useCase, label: useCase })),
      ratings: [
        { id: '5', label: '5 Stars' },
        { id: '4', label: '4+ Stars' },
        { id: '3', label: '3+ Stars' }
      ]
    };

    logger.info('Fetched testimonial filters from database');

    res.status(200).json({
      status: 'success',
      data: {
        filters
      }
    });
  } catch (error) {
    logger.error('Error fetching testimonial filters from database:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch filters'
    });
  }
});

// CRUD Operations

// Create testimonial
export const createTestimonial = catchAsync(async (req, res, next) => {
  try {
    const testimonialData = req.body;
    
    // Generate ID from name and company if not provided
    const id = testimonialData.id || 
      `${testimonialData.name}-${testimonialData.company}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    
    // Check if testimonial with this ID already exists
    const existingTestimonial = await Testimonial.findOne({ id });
    if (existingTestimonial) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Testimonial with this ID already exists' 
      });
    }
    
    const newTestimonialData = {
      id,
      name: testimonialData.name,
      role: testimonialData.role,
      company: testimonialData.company,
      industry: testimonialData.industry || 'Technology',
      location: testimonialData.location || '',
      date: testimonialData.date || new Date(),
      quote: testimonialData.quote,
      longQuote: testimonialData.longQuote || testimonialData.quote,
      image: testimonialData.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: testimonialData.rating || 5,
      featured: testimonialData.featured || false,
      verified: testimonialData.verified !== undefined ? testimonialData.verified : true,
      videoUrl: testimonialData.videoUrl || null,
      results: testimonialData.results || [],
      tags: testimonialData.tags || [],
      useCase: testimonialData.useCase || 'general',
      companySize: testimonialData.companySize || 'Small business (1-100 employees)',
      implementation: testimonialData.implementation || {
        duration: '1-2 weeks',
        challenges: [],
        solutions: []
      }
    };
    
    const newTestimonial = await Testimonial.create(newTestimonialData);
    
    logger.info(`Created new testimonial: ${newTestimonial.name}`, { id: newTestimonial.id });
    
    res.status(201).json({
      status: 'success',
      data: {
        testimonial: newTestimonial
      }
    });
  } catch (error) {
    logger.error('Error creating testimonial:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        status: 'error',
        message: 'Validation error',
        details: error.errors
      });
    }
    return res.status(500).json({ 
      status: 'error',
      message: 'Internal server error' 
    });
  }
});

// Update testimonial
export const updateTestimonial = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const testimonial = await Testimonial.findOneAndUpdate(
      { id }, 
      updates, 
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!testimonial) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Testimonial not found' 
      });
    }
    
    logger.info(`Updated testimonial: ${testimonial.name}`, { id });
    
    res.status(200).json({
      status: 'success',
      data: {
        testimonial
      }
    });
  } catch (error) {
    logger.error('Error updating testimonial:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        status: 'error',
        message: 'Validation error',
        details: error.errors
      });
    }
    return res.status(500).json({ 
      status: 'error',
      message: 'Internal server error' 
    });
  }
});

// Delete testimonial
export const deleteTestimonial = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deletedTestimonial = await Testimonial.findOneAndDelete({ id });
    
    if (!deletedTestimonial) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Testimonial not found' 
      });
    }
    
    logger.info(`Deleted testimonial: ${deletedTestimonial.name}`, { id });
    
    res.status(200).json({
      status: 'success',
      message: 'Testimonial deleted successfully',
      data: {
        testimonial: deletedTestimonial
      }
    });
  } catch (error) {
    logger.error('Error deleting testimonial:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'Internal server error' 
    });
  }
}); 