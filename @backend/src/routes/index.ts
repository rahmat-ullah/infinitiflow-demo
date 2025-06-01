import { Router } from 'express';
import authRoutes from './auth';
import toolsRoutes from './tools';
import heroRoutes from './hero';
import featuresRoutes from './features';
import blogsRoutes from './blogs';

const router = Router();

// Welcome message for API root
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Infinitiflow Tools API',
    version: '1.0.0',
    description: 'Backend API for Infinitiflow Tools Landing Page',
    docs: '/api/docs', // Future API documentation endpoint
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      hero: {
        get: 'GET /api/hero',
        getAll: 'GET /api/hero/all',
        getById: 'GET /api/hero/:id',
        create: 'POST /api/hero',
        update: 'PUT /api/hero/:id',
        activate: 'PATCH /api/hero/:id/activate',
        delete: 'DELETE /api/hero/:id'
      },
      features: {
        get: 'GET /api/features',
        getAll: 'GET /api/features/all',
        getById: 'GET /api/features/:id',
        create: 'POST /api/features',
        update: 'PUT /api/features/:id',
        activate: 'PATCH /api/features/:id/activate',
        delete: 'DELETE /api/features/:id',
        stats: 'GET /api/features/stats/summary'
      },
      blogs: {
        list: 'GET /api/blogs',
        getBySlug: 'GET /api/blogs/slug/:slug',
        getById: 'GET /api/blogs/:id',
        adminList: 'GET /api/blogs/admin/all',
        create: 'POST /api/blogs',
        update: 'PUT /api/blogs/:id',
        publish: 'PATCH /api/blogs/:id/publish',
        unpublish: 'PATCH /api/blogs/:id/unpublish',
        delete: 'DELETE /api/blogs/:id',
        uploadImage: 'POST /api/blogs/upload/image',
        uploadImages: 'POST /api/blogs/upload/images',
        popular: 'GET /api/blogs/stats/popular',
        recent: 'GET /api/blogs/stats/recent',
        stats: 'GET /api/blogs/stats/summary',
        categories: 'GET /api/blogs/categories',
        tags: 'GET /api/blogs/tags'
      },
      tools: {
        list: 'GET /api/tools',
        featured: 'GET /api/tools/featured',
        categories: 'GET /api/tools/categories',
        single: 'GET /api/tools/:id',
        create: 'POST /api/tools',
        update: 'PUT /api/tools/:id',
        delete: 'DELETE /api/tools/:id',
        like: 'POST /api/tools/:id/like'
      },
      health: 'GET /health'
    },
    database: 'MongoDB',
    features: [
      'User Authentication',
      'Hero Section Management',
      'Features Section Management',
      'Blog Management',
      'Rich Text & Markdown Support',
      'Image Upload & Management',
      'Tools Management',
      'Categories & Filtering',
      'Search & Pagination',
      'Featured Tools',
      'Statistics & Analytics'
    ]
  });
});

// Mount sub-routes
router.use('/auth', authRoutes);
router.use('/hero', heroRoutes);
router.use('/features', featuresRoutes);
router.use('/blogs', blogsRoutes);
router.use('/tools', toolsRoutes);

export default router; 