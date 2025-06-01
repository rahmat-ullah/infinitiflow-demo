import { Router, Request, Response } from 'express';
import { createLogger } from '../utils/logger.js';
import { Tool, ITool } from '../models/Tool.js';
import { body, validationResult, query } from 'express-validator';

const router = Router();
const logger = createLogger();

// Validation middleware
const createToolValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Tool name must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('category').isIn(['productivity', 'design', 'development', 'marketing', 'analytics', 'automation', 'communication', 'finance', 'other']).withMessage('Invalid category'),
  body('url').optional().isURL().withMessage('URL must be valid'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('features').optional().isArray().withMessage('Features must be an array')
];

const updateToolValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Tool name must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('category').optional().isIn(['productivity', 'design', 'development', 'marketing', 'analytics', 'automation', 'communication', 'finance', 'other']).withMessage('Invalid category'),
  body('url').optional().isURL().withMessage('URL must be valid'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('features').optional().isArray().withMessage('Features must be an array')
];

// Get all tools with filtering and pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status = 'active',
      featured,
      search,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter: any = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions: any = {};
    sortOptions[sortBy as string] = order === 'desc' ? -1 : 1;

    // Execute query
    const tools = await Tool.find(filter)
      .populate('createdBy', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Tool.countDocuments(filter);

    res.json({
      success: true,
      data: {
        tools,
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
    logger.error('Get tools error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tools'
    });
  }
});

// Get featured tools
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const tools = await Tool.find({ 
      featured: true, 
      status: 'active' 
    })
    .populate('createdBy', 'name email')
    .sort({ 'stats.views': -1 })
    .limit(6);

    res.json({
      success: true,
      data: tools
    });
  } catch (error) {
    logger.error('Get featured tools error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured tools'
    });
  }
});

// Get tool categories with counts
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await Tool.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    logger.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
});

// Get single tool by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const tool = await Tool.findById(req.params.id)
      .populate('createdBy', 'name email avatar');

    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found'
      });
    }

    // Increment view count
    await Tool.findByIdAndUpdate(req.params.id, {
      $inc: { 'stats.views': 1 }
    });

    res.json({
      success: true,
      data: tool
    });
  } catch (error) {
    logger.error('Get tool error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tool'
    });
  }
});

// Create new tool (requires authentication)
router.post('/', createToolValidation, async (req: Request, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    // For now, use a placeholder user ID (implement authentication middleware)
    const tool = new Tool({
      ...req.body,
      createdBy: '507f1f77bcf86cd799439011' // Placeholder ObjectId
    });

    await tool.save();

    logger.info(`Tool created: ${tool.name}`);

    res.status(201).json({
      success: true,
      data: tool
    });
  } catch (error: any) {
    logger.error('Create tool error:', error);
    
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
      error: 'Failed to create tool'
    });
  }
});

// Update tool by ID
router.put('/:id', updateToolValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found'
      });
    }

    logger.info(`Tool updated: ${tool.name}`);

    res.json({
      success: true,
      data: tool
    });
  } catch (error) {
    logger.error('Update tool error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update tool'
    });
  }
});

// Delete tool by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);

    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found'
      });
    }

    logger.info(`Tool deleted: ${tool.name}`);

    res.json({
      success: true,
      message: 'Tool deleted successfully'
    });
  } catch (error) {
    logger.error('Delete tool error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete tool'
    });
  }
});

// Like/Unlike tool
router.post('/:id/like', async (req: Request, res: Response) => {
  try {
    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { $inc: { 'stats.likes': 1 } },
      { new: true }
    );

    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found'
      });
    }

    res.json({
      success: true,
      data: { likes: tool.stats?.likes || 0 }
    });
  } catch (error) {
    logger.error('Like tool error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to like tool'
    });
  }
});

export default router; 