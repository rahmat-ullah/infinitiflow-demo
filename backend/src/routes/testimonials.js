import express from 'express';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(optionalAuth);

// Placeholder routes
router.get('/', (req, res) => res.json({ message: 'Get all testimonials' }));
router.get('/featured', (req, res) => res.json({ message: 'Get featured testimonials' }));

export default router; 