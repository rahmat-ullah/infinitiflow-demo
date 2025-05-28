import express from 'express';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(optionalAuth);

// Placeholder routes
router.get('/', (req, res) => res.json({ message: 'Get all use cases' }));
router.get('/:id', (req, res) => res.json({ message: 'Get specific use case' }));

export default router; 