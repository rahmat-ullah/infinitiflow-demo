import { Router, Request, Response } from 'express';
import { createLogger } from '../utils/logger.js';
import { HeroSection, IHeroSection } from '../models/HeroSection.js';
import { body, validationResult } from 'express-validator';

const router = Router();
const logger = createLogger();

// Validation middleware for hero section
const heroValidation = [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('subtitle').trim().isLength({ min: 10, max: 150 }).withMessage('Subtitle must be between 10 and 150 characters'),
  body('description').trim().isLength({ min: 20, max: 500 }).withMessage('Description must be between 20 and 500 characters'),
  body('primaryCTA.text').trim().isLength({ min: 2, max: 50 }).withMessage('Primary CTA text must be between 2 and 50 characters'),
  body('primaryCTA.url').trim().notEmpty().withMessage('Primary CTA URL is required'),
  body('secondaryCTA.text').optional().trim().isLength({ max: 50 }).withMessage('Secondary CTA text cannot exceed 50 characters'),
  body('secondaryCTA.url').optional().trim(),
  body('backgroundImage').optional().isURL().withMessage('Background image must be a valid URL'),
  body('backgroundVideo').optional().isURL().withMessage('Background video must be a valid URL'),
  body('stats').optional().isArray().withMessage('Stats must be an array'),
  body('features').optional().isArray().withMessage('Features must be an array')
];

// Get active hero section
router.get('/', async (req: Request, res: Response) => {
  try {
    const heroSection = await HeroSection.findOne({ isActive: true })
      .sort({ updatedAt: -1 });

    if (!heroSection) {
      return res.status(404).json({
        success: false,
        error: 'No active hero section found'
      });
    }

    res.json({
      success: true,
      data: heroSection
    });
  } catch (error) {
    logger.error('Get hero section error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch hero section'
    });
  }
});

// Get all hero sections (for admin)
router.get('/all', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      isActive
    } = req.query;

    const filter: any = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const heroSections = await HeroSection.find(filter)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await HeroSection.countDocuments(filter);

    res.json({
      success: true,
      data: {
        heroSections,
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
    logger.error('Get all hero sections error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch hero sections'
    });
  }
});

// Get hero section by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const heroSection = await HeroSection.findById(req.params.id);

    if (!heroSection) {
      return res.status(404).json({
        success: false,
        error: 'Hero section not found'
      });
    }

    res.json({
      success: true,
      data: heroSection
    });
  } catch (error) {
    logger.error('Get hero section by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch hero section'
    });
  }
});

// Create new hero section
router.post('/', heroValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const heroSection = new HeroSection(req.body);
    await heroSection.save();

    logger.info(`Hero section created: ${heroSection.title}`);

    res.status(201).json({
      success: true,
      data: heroSection
    });
  } catch (error: any) {
    logger.error('Create hero section error:', error);
    
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
      error: 'Failed to create hero section'
    });
  }
});

// Update hero section by ID
router.put('/:id', heroValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const heroSection = await HeroSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!heroSection) {
      return res.status(404).json({
        success: false,
        error: 'Hero section not found'
      });
    }

    logger.info(`Hero section updated: ${heroSection.title}`);

    res.json({
      success: true,
      data: heroSection
    });
  } catch (error) {
    logger.error('Update hero section error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update hero section'
    });
  }
});

// Activate hero section (set as active, deactivate others)
router.patch('/:id/activate', async (req: Request, res: Response) => {
  try {
    // First, deactivate all hero sections
    await HeroSection.updateMany({}, { $set: { isActive: false } });

    // Then activate the selected one
    const heroSection = await HeroSection.findByIdAndUpdate(
      req.params.id,
      { $set: { isActive: true } },
      { new: true }
    );

    if (!heroSection) {
      return res.status(404).json({
        success: false,
        error: 'Hero section not found'
      });
    }

    logger.info(`Hero section activated: ${heroSection.title}`);

    res.json({
      success: true,
      data: heroSection,
      message: 'Hero section activated successfully'
    });
  } catch (error) {
    logger.error('Activate hero section error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to activate hero section'
    });
  }
});

// Delete hero section by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const heroSection = await HeroSection.findByIdAndDelete(req.params.id);

    if (!heroSection) {
      return res.status(404).json({
        success: false,
        error: 'Hero section not found'
      });
    }

    logger.info(`Hero section deleted: ${heroSection.title}`);

    res.json({
      success: true,
      message: 'Hero section deleted successfully'
    });
  } catch (error) {
    logger.error('Delete hero section error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete hero section'
    });
  }
});

export default router; 