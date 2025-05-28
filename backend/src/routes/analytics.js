import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// Placeholder routes
router.get('/dashboard', (req, res) => res.json({ message: 'Get dashboard analytics' }));
router.get('/usage', (req, res) => res.json({ message: 'Get usage analytics' }));
router.get('/content-performance', (req, res) => res.json({ message: 'Get content performance' }));

export default router; 