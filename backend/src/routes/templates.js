import express from 'express';
import { body } from 'express-validator';
import {
  getAllTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getFeaturedTemplates,
  getPopularTemplates,
  getTemplatesByCategory,
  searchTemplates,
  useTemplate,
  rateTemplate,
  duplicateTemplate
} from '../controllers/templateController.js';
import { protect, restrictTo, checkSubscription } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/featured', getFeaturedTemplates);
router.get('/popular', getPopularTemplates);
router.get('/category/:category', getTemplatesByCategory);
router.get('/search', searchTemplates);

// Protected routes
router.use(protect);

router.get('/', getAllTemplates);
router.get('/:id', getTemplate);
router.post('/:id/use', useTemplate);
router.post('/:id/rate', [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], rateTemplate);
router.post('/:id/duplicate', duplicateTemplate);

// Template creation (basic plan required)
router.post('/', checkSubscription('basic'), [
  body('name').notEmpty().withMessage('Template name is required'),
  body('description').notEmpty().withMessage('Template description is required'),
  body('prompt').notEmpty().withMessage('Template prompt is required'),
  body('category').notEmpty().withMessage('Template category is required'),
  body('type').notEmpty().withMessage('Template type is required')
], createTemplate);

router.patch('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router; 