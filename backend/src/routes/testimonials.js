import express from 'express';
import { optionalAuth } from '../middleware/auth.js';
import {
  getAllTestimonials,
  getTestimonial,
  getCustomerMetrics,
  getTestimonialFilters,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialsController.js';

const router = express.Router();

// Apply optional authentication to all routes
router.use(optionalAuth);

// Public testimonials routes
router.get('/', getAllTestimonials);
router.get('/metrics', getCustomerMetrics);
router.get('/filters', getTestimonialFilters);
router.get('/:id', getTestimonial);

// Admin CRUD routes
router.post('/', createTestimonial);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router; 