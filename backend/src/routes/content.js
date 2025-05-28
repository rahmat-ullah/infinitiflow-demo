import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getAllContent,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  generateContent,
  duplicateContent,
  revertToVersion,
  toggleFavorite,
  addRating,
  searchContent,
  getPopularContent,
  getTrendingContent
} from '../controllers/contentController.js';
import { protect, checkSubscription } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Content generation
router.post('/generate', [
  body('prompt').notEmpty().withMessage('Prompt is required'),
  body('type').isIn(['blog-post', 'social-media-post', 'email', 'ad-copy', 'product-description', 'press-release', 'newsletter', 'landing-page', 'seo-content', 'video-script', 'podcast-script', 'other']).withMessage('Invalid content type'),
  body('title').optional().isLength({ max: 200 }).withMessage('Title too long')
], checkSubscription('free'), generateContent);

// CRUD operations
router.get('/', getAllContent);
router.get('/search', searchContent);
router.get('/popular', getPopularContent);
router.get('/trending', getTrendingContent);
router.get('/:id', getContent);
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('type').isIn(['blog-post', 'social-media-post', 'email', 'ad-copy', 'product-description', 'press-release', 'newsletter', 'landing-page', 'seo-content', 'video-script', 'podcast-script', 'other']).withMessage('Invalid content type')
], createContent);
router.patch('/:id', updateContent);
router.delete('/:id', deleteContent);

// Content actions
router.post('/:id/duplicate', duplicateContent);
router.patch('/:id/revert/:versionIndex', revertToVersion);
router.patch('/:id/favorite', toggleFavorite);
router.post('/:id/rating', [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], addRating);

export default router; 