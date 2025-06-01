import { Router, Request, Response } from 'express';
import { createLogger } from '../utils/logger.js';
import { FeatureSection, IFeatureSection } from '../models/FeatureSection.js';
import { body, validationResult } from 'express-validator';

const router = Router();
const logger = createLogger();

// Validation middleware for feature section
const featureSectionValidation = [
  body('sectionTitle').trim().isLength({ min: 5, max: 200 }).withMessage('Section title must be between 5 and 200 characters'),
  body('sectionSubtitle').optional().trim().isLength({ max: 300 }).withMessage('Section subtitle cannot exceed 300 characters'),
  body('sectionDescription').optional().trim().isLength({ max: 1000 }).withMessage('Section description cannot exceed 1000 characters'),
  body('badge.text').optional().trim().isLength({ max: 50 }).withMessage('Badge text cannot exceed 50 characters'),
  body('badge.icon').optional().trim().isLength({ max: 50 }).withMessage('Badge icon cannot exceed 50 characters'),
  body('features').isArray({ min: 1, max: 20 }).withMessage('Features must be an array with 1-20 items'),
  body('features.*.title').trim().isLength({ min: 2, max: 100 }).withMessage('Feature title must be between 2 and 100 characters'),
  body('features.*.description').trim().isLength({ min: 10, max: 500 }).withMessage('Feature description must be between 10 and 500 characters'),
  body('features.*.icon').trim().isLength({ min: 1, max: 50 }).withMessage('Feature icon must be between 1 and 50 characters'),
  body('features.*.isVisible').optional().isBoolean().withMessage('Feature isVisible must be a boolean'),
  body('features.*.order').isInt({ min: 0 }).withMessage('Feature order must be a non-negative integer'),
  body('version').matches(/^\d+\.\d+\.\d+$/).withMessage('Version must follow semantic versioning (e.g., 1.0.0)'),
  body('maxFeatures').optional().isInt({ min: 1, max: 20 }).withMessage('Max features must be between 1 and 20'),
  body('displayMode').optional().isIn(['grid', 'list', 'carousel']).withMessage('Display mode must be grid, list, or carousel'),
  body('theme.showIcons').optional().isBoolean().withMessage('Show icons must be a boolean'),
  body('theme.cardStyle').optional().isIn(['default', 'minimal', 'featured']).withMessage('Card style must be default, minimal, or featured'),
  body('theme.columns').optional().isInt({ min: 1, max: 6 }).withMessage('Columns must be between 1 and 6')
];

// Get active feature section
router.get('/', async (req: Request, res: Response) => {
  try {
    const featureSection = await FeatureSection.findOne({ isActive: true })
      .sort({ updatedAt: -1 });

    if (!featureSection) {
      return res.status(404).json({
        success: false,
        error: 'No active feature section found'
      });
    }

    // Return only visible features in correct order
    const visibleFeatures = featureSection.getVisibleFeatures();
    
    res.json({
      success: true,
      data: {
        ...featureSection.toObject(),
        features: visibleFeatures
      }
    });
  } catch (error) {
    logger.error('Get feature section error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feature section'
    });
  }
});

// Get all feature sections (for admin)
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

    const featureSections = await FeatureSection.find(filter)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await FeatureSection.countDocuments(filter);

    res.json({
      success: true,
      data: {
        featureSections,
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
    logger.error('Get all feature sections error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feature sections'
    });
  }
});

// Get feature section by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const featureSection = await FeatureSection.findById(req.params.id);

    if (!featureSection) {
      return res.status(404).json({
        success: false,
        error: 'Feature section not found'
      });
    }

    res.json({
      success: true,
      data: featureSection
    });
  } catch (error) {
    logger.error('Get feature section by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feature section'
    });
  }
});

// Create new feature section
router.post('/', featureSectionValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const featureSection = new FeatureSection(req.body);
    await featureSection.save();

    logger.info(`Feature section created: ${featureSection.sectionTitle}`);

    res.status(201).json({
      success: true,
      data: featureSection
    });
  } catch (error: any) {
    logger.error('Create feature section error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: messages
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Feature section with this version already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create feature section'
    });
  }
});

// Update feature section by ID
router.put('/:id', featureSectionValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const featureSection = await FeatureSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!featureSection) {
      return res.status(404).json({
        success: false,
        error: 'Feature section not found'
      });
    }

    logger.info(`Feature section updated: ${featureSection.sectionTitle}`);

    res.json({
      success: true,
      data: featureSection
    });
  } catch (error: any) {
    logger.error('Update feature section error:', error);
    
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
      error: 'Failed to update feature section'
    });
  }
});

// Patch update (partial update)
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const featureSection = await FeatureSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!featureSection) {
      return res.status(404).json({
        success: false,
        error: 'Feature section not found'
      });
    }

    logger.info(`Feature section patched: ${featureSection.sectionTitle}`);

    res.json({
      success: true,
      data: featureSection
    });
  } catch (error) {
    logger.error('Patch feature section error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update feature section'
    });
  }
});

// Activate feature section
router.patch('/:id/activate', async (req: Request, res: Response) => {
  try {
    const featureSection = await FeatureSection.findById(req.params.id);

    if (!featureSection) {
      return res.status(404).json({
        success: false,
        error: 'Feature section not found'
      });
    }

    await featureSection.activate();

    logger.info(`Feature section activated: ${featureSection.sectionTitle}`);

    res.json({
      success: true,
      data: featureSection,
      message: 'Feature section activated successfully'
    });
  } catch (error) {
    logger.error('Activate feature section error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to activate feature section'
    });
  }
});

// Delete feature section by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const featureSection = await FeatureSection.findById(req.params.id);

    if (!featureSection) {
      return res.status(404).json({
        success: false,
        error: 'Feature section not found'
      });
    }

    // Prevent deletion of active feature section
    if (featureSection.isActive) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete active feature section. Please activate another section first.'
      });
    }

    await FeatureSection.findByIdAndDelete(req.params.id);

    logger.info(`Feature section deleted: ${featureSection.sectionTitle}`);

    res.json({
      success: true,
      message: 'Feature section deleted successfully'
    });
  } catch (error) {
    logger.error('Delete feature section error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete feature section'
    });
  }
});

// Create new version from existing feature section
router.post('/:id/version', async (req: Request, res: Response) => {
  try {
    const { version } = req.body;

    if (!version || !version.match(/^\d+\.\d+\.\d+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Valid version number is required (e.g., 1.0.0)'
      });
    }

    const existingSection = await FeatureSection.findById(req.params.id);

    if (!existingSection) {
      return res.status(404).json({
        success: false,
        error: 'Feature section not found'
      });
    }

    const newSection = await FeatureSection.createVersion(existingSection.toObject(), version);

    logger.info(`Feature section version created: ${version} from ${existingSection.sectionTitle}`);

    res.status(201).json({
      success: true,
      data: newSection,
      message: `Version ${version} created successfully`
    });
  } catch (error: any) {
    logger.error('Create feature section version error:', error);
    
    if (error.message.includes('already exists')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create feature section version'
    });
  }
});

// Get feature statistics
router.get('/stats/summary', async (req: Request, res: Response) => {
  try {
    const totalSections = await FeatureSection.countDocuments();
    const activeSections = await FeatureSection.countDocuments({ isActive: true });
    const totalFeatures = await FeatureSection.aggregate([
      { $unwind: '$features' },
      { $group: { _id: null, total: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalSections,
        activeSections,
        totalFeatures: totalFeatures[0]?.total || 0,
        inactiveSections: totalSections - activeSections
      }
    });
  } catch (error) {
    logger.error('Get feature stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feature statistics'
    });
  }
});

export default router; 