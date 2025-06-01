import { Router, Request, Response } from 'express';
import { createLogger } from '../utils/logger.js';
import { Testimonial, ITestimonial } from '../models/Testimonial.js';
import { body, validationResult, param, query } from 'express-validator';
import { uploadTestimonialImage, getTestimonialImageUrl, deleteTestimonialImage } from '../config/upload.js';
import path from 'path';

const router = Router();
const logger = createLogger();

// Validation middleware for testimonial
const testimonialValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('role').trim().isLength({ min: 2, max: 100 }).withMessage('Role must be between 2 and 100 characters'),
  body('company').trim().isLength({ min: 2, max: 100 }).withMessage('Company must be between 2 and 100 characters'),
  body('quote').trim().isLength({ min: 10, max: 1000 }).withMessage('Quote must be between 10 and 1000 characters'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),
  body('industry').optional().trim().isLength({ max: 50 }).withMessage('Industry cannot exceed 50 characters'),
  body('companySize').optional().isIn(['1-10', '11-50', '51-200', '201-1000', '1000+']).withMessage('Invalid company size'),
  body('videoUrl').optional().trim().isURL().withMessage('Video URL must be valid'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().isLength({ max: 30 }).withMessage('Tag cannot exceed 30 characters'),
  body('featured').optional().isBoolean().withMessage('Featured must be boolean'),
  body('active').optional().isBoolean().withMessage('Active must be boolean'),
  body('displayOrder').optional().isInt({ min: 0 }).withMessage('Display order must be a positive integer')
];

// Get active testimonials (public endpoint)
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      featured,
      industry,
      minRating,
      search,
      sortBy = 'displayOrder',
      sortOrder = 'asc'
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = { active: true };
    
    if (featured === 'true') {
      filter.featured = true;
    }
    
    if (industry) {
      filter.industry = { $regex: industry, $options: 'i' };
    }
    
    if (minRating) {
      filter.rating = { $gte: parseInt(minRating as string) };
    }
    
    if (search) {
      filter.$text = { $search: search as string };
    }

    // Build sort
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const testimonials = await Testimonial.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Testimonial.countDocuments(filter);

    res.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          current: pageNum,
          total: Math.ceil(total / limitNum),
          totalItems: total,
          hasNext: pageNum * limitNum < total,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    logger.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonials'
    });
  }
});

// Get featured testimonials (public endpoint)
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const { limit = 3 } = req.query;
    const limitNum = parseInt(limit as string);
    
    const testimonials = await Testimonial.find({ featured: true, active: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limitNum);

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    logger.error('Get featured testimonials error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured testimonials'
    });
  }
});

// Get random testimonials (public endpoint)
router.get('/random', async (req: Request, res: Response) => {
  try {
    const { limit = 3 } = req.query;
    const testimonials = await Testimonial.getRandomTestimonials(parseInt(limit as string));

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    logger.error('Get random testimonials error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch random testimonials'
    });
  }
});

// Get all testimonials (admin endpoint)
router.get('/admin/all', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      industry,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = {};
    
    if (status === 'active') {
      filter.active = true;
    } else if (status === 'inactive') {
      filter.active = false;
    } else if (status === 'featured') {
      filter.featured = true;
    }
    
    if (industry) {
      filter.industry = { $regex: industry, $options: 'i' };
    }
    
    if (search) {
      filter.$text = { $search: search as string };
    }

    // Build sort
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const testimonials = await Testimonial.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Testimonial.countDocuments(filter);

    res.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          current: pageNum,
          total: Math.ceil(total / limitNum),
          totalItems: total,
          hasNext: pageNum * limitNum < total,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    logger.error('Get admin testimonials error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonials'
    });
  }
});

// Get testimonial by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    logger.error('Get testimonial by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonial'
    });
  }
});

// Create new testimonial
router.post('/', testimonialValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const testimonial = new Testimonial(req.body);
    await testimonial.save();

    logger.info(`Testimonial created: ${testimonial.name} from ${testimonial.company}`);

    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (error: any) {
    logger.error('Create testimonial error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create testimonial'
    });
  }
});

// Update testimonial
router.put('/:id', testimonialValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    logger.info(`Testimonial updated: ${testimonial.name} from ${testimonial.company}`);

    res.json({
      success: true,
      data: testimonial
    });
  } catch (error: any) {
    logger.error('Update testimonial error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update testimonial'
    });
  }
});

// Toggle active status
router.patch('/:id/toggle-active', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    if (testimonial.active) {
      await testimonial.deactivate();
    } else {
      await testimonial.activate();
    }

    logger.info(`Testimonial ${testimonial.active ? 'activated' : 'deactivated'}: ${testimonial.name}`);

    res.json({
      success: true,
      data: testimonial,
      message: `Testimonial ${testimonial.active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    logger.error('Toggle testimonial active status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle testimonial status'
    });
  }
});

// Toggle featured status
router.patch('/:id/toggle-featured', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    if (testimonial.featured) {
      await testimonial.unfeature();
    } else {
      await testimonial.feature();
    }

    logger.info(`Testimonial ${testimonial.featured ? 'featured' : 'unfeatured'}: ${testimonial.name}`);

    res.json({
      success: true,
      data: testimonial,
      message: `Testimonial ${testimonial.featured ? 'featured' : 'unfeatured'} successfully`
    });
  } catch (error) {
    logger.error('Toggle testimonial featured status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle testimonial featured status'
    });
  }
});

// Delete testimonial
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    // Delete associated image if it's uploaded to our server
    if (testimonial.image && testimonial.image.includes('/uploads/')) {
      const filename = path.basename(testimonial.image);
      await deleteTestimonialImage(filename).catch(err => logger.warn('Failed to delete testimonial image:', err));
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    logger.info(`Testimonial deleted: ${testimonial.name} from ${testimonial.company}`);

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    logger.error('Delete testimonial error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete testimonial'
    });
  }
});

// Upload testimonial image
router.post('/upload/image', (req: Request, res: Response) => {
  uploadTestimonialImage(req, res, (err) => {
    if (err) {
      logger.error('Testimonial image upload error:', err);
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    const imageUrl = getTestimonialImageUrl(req.file.filename);

    res.json({
      success: true,
      data: {
        url: imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  });
});

// Get testimonial statistics
router.get('/stats/summary', async (req: Request, res: Response) => {
  try {
    const stats = await Testimonial.getStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Get testimonial stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonial statistics'
    });
  }
});

// Get industries
router.get('/meta/industries', async (req: Request, res: Response) => {
  try {
    const industries = await Testimonial.aggregate([
      { $match: { active: true, industry: { $exists: true, $ne: '' } } },
      { $group: { _id: '$industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: industries.map(ind => ({
        name: ind._id,
        count: ind.count
      }))
    });
  } catch (error) {
    logger.error('Get industries error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch industries'
    });
  }
});

// Get companies
router.get('/meta/companies', async (req: Request, res: Response) => {
  try {
    const companies = await Testimonial.aggregate([
      { $match: { active: true } },
      { $group: { _id: '$company', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 }
    ]);

    res.json({
      success: true,
      data: companies.map(comp => ({
        name: comp._id,
        count: comp.count
      }))
    });
  } catch (error) {
    logger.error('Get companies error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch companies'
    });
  }
});

export default router; 