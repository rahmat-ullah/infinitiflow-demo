import { Router, Request, Response } from 'express';
import { createLogger } from '../utils/logger.js';
import { Blog, IBlog } from '../models/Blog.js';
import { body, validationResult, param, query } from 'express-validator';
import { uploadSingle, uploadMultiple, getImageUrl, deleteImage } from '../config/upload.js';
import path from 'path';

const router = Router();
const logger = createLogger();

// Validation middleware for blog
const blogValidation = [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('content').isLength({ min: 50 }).withMessage('Content must be at least 50 characters long'),
  body('excerpt').optional().trim().isLength({ max: 500 }).withMessage('Excerpt cannot exceed 500 characters'),
  body('contentType').optional().isIn(['rich-text', 'markdown']).withMessage('Content type must be rich-text or markdown'),
  body('author.name').trim().isLength({ min: 2, max: 100 }).withMessage('Author name must be between 2 and 100 characters'),
  body('author.email').optional().isEmail().withMessage('Invalid author email'),
  body('author.bio').optional().trim().isLength({ max: 500 }).withMessage('Author bio cannot exceed 500 characters'),
  body('categories').optional().isArray().withMessage('Categories must be an array'),
  body('categories.*').optional().trim().isLength({ max: 50 }).withMessage('Category name cannot exceed 50 characters'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().isLength({ max: 30 }).withMessage('Tag name cannot exceed 30 characters'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),
  body('seo.metaTitle').optional().trim().isLength({ max: 60 }).withMessage('Meta title cannot exceed 60 characters'),
  body('seo.metaDescription').optional().trim().isLength({ max: 160 }).withMessage('Meta description cannot exceed 160 characters')
];

// Get all published blogs
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = { status: 'published' };
    
    if (category) {
      filter.categories = { $in: [category] };
    }
    
    if (tag) {
      filter.tags = { $in: [tag] };
    }
    
    if (search) {
      filter.$text = { $search: search as string };
    }

    // Build sort
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const blogs = await Blog.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .select('-content'); // Exclude full content for performance

    const total = await Blog.countDocuments(filter);

    res.json({
      success: true,
      data: {
        blogs,
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
    logger.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blogs'
    });
  }
});

// Get blog by slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({
        success: false,
        error: 'Slug parameter is required'
      });
    }

    const blog = await Blog.findBySlug(slug);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    // Increment view count
    blog.viewCount += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    logger.error('Get blog by slug error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog'
    });
  }
});

// Get all blogs (for admin)
router.get('/admin/all', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      author,
      search
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (author) {
      filter['author.name'] = { $regex: author, $options: 'i' };
    }
    
    if (search) {
      filter.$text = { $search: search as string };
    }

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Blog.countDocuments(filter);

    res.json({
      success: true,
      data: {
        blogs,
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
    logger.error('Get admin blogs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blogs'
    });
  }
});

// Get blog by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    logger.error('Get blog by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog'
    });
  }
});

// Create new blog
router.post('/', blogValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const blog = new Blog(req.body);
    await blog.save();

    logger.info(`Blog created: ${blog.title}`);

    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error: any) {
    logger.error('Create blog error:', error);
    
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
        error: 'Blog with this slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create blog'
    });
  }
});

// Update blog
router.put('/:id', blogValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    logger.info(`Blog updated: ${blog.title}`);

    res.json({
      success: true,
      data: blog
    });
  } catch (error: any) {
    logger.error('Update blog error:', error);
    
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
      error: 'Failed to update blog'
    });
  }
});

// Publish blog
router.patch('/:id/publish', async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    await blog.publish();

    logger.info(`Blog published: ${blog.title}`);

    res.json({
      success: true,
      data: blog,
      message: 'Blog published successfully'
    });
  } catch (error) {
    logger.error('Publish blog error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to publish blog'
    });
  }
});

// Unpublish blog
router.patch('/:id/unpublish', async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    await blog.unpublish();

    logger.info(`Blog unpublished: ${blog.title}`);

    res.json({
      success: true,
      data: blog,
      message: 'Blog unpublished successfully'
    });
  } catch (error) {
    logger.error('Unpublish blog error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to unpublish blog'
    });
  }
});

// Delete blog
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    // Delete associated images
    if (blog.featuredImage) {
      const filename = path.basename(blog.featuredImage.url);
      await deleteImage(filename).catch(err => logger.warn('Failed to delete featured image:', err));
    }

    for (const image of blog.images) {
      const filename = path.basename(image.url);
      await deleteImage(filename).catch(err => logger.warn('Failed to delete blog image:', err));
    }

    await Blog.findByIdAndDelete(req.params.id);

    logger.info(`Blog deleted: ${blog.title}`);

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    logger.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete blog'
    });
  }
});

// Upload single image
router.post('/upload/image', (req: Request, res: Response) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      logger.error('Image upload error:', err);
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

    const imageUrl = getImageUrl(req.file.filename);

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

// Upload multiple images
router.post('/upload/images', (req: Request, res: Response) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      logger.error('Images upload error:', err);
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No image files provided'
      });
    }

    const uploadedImages = req.files.map((file: Express.Multer.File) => ({
      url: getImageUrl(file.filename),
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      success: true,
      data: {
        images: uploadedImages,
        count: uploadedImages.length
      }
    });
  });
});

// Get popular blogs
router.get('/stats/popular', async (req: Request, res: Response) => {
  try {
    const { limit = 5 } = req.query;
    const blogs = await Blog.getPopularBlogs(parseInt(limit as string));

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    logger.error('Get popular blogs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch popular blogs'
    });
  }
});

// Get recent blogs
router.get('/stats/recent', async (req: Request, res: Response) => {
  try {
    const { limit = 5 } = req.query;
    const blogs = await Blog.getRecentBlogs(parseInt(limit as string));

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    logger.error('Get recent blogs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent blogs'
    });
  }
});

// Get blog statistics
router.get('/stats/summary', async (req: Request, res: Response) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const archivedBlogs = await Blog.countDocuments({ status: 'archived' });
    
    // Get total views
    const viewStats = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$viewCount' } } }
    ]);
    
    // Get categories
    const categoryStats = await Blog.aggregate([
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        archivedBlogs,
        totalViews: viewStats[0]?.totalViews || 0,
        topCategories: categoryStats
      }
    });
  } catch (error) {
    logger.error('Get blog stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog statistics'
    });
  }
});

// Get categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories.map(cat => ({
        name: cat._id,
        count: cat.count
      }))
    });
  } catch (error) {
    logger.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
});

// Get tags
router.get('/tags', async (req: Request, res: Response) => {
  try {
    const tags = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 }
    ]);

    res.json({
      success: true,
      data: tags.map(tag => ({
        name: tag._id,
        count: tag.count
      }))
    });
  } catch (error) {
    logger.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tags'
    });
  }
});

export default router; 