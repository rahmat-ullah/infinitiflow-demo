import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, restrictTo('admin'));

// Placeholder routes
router.get('/users', (req, res) => res.json({ message: 'Get all users' }));
router.get('/statistics', (req, res) => res.json({ message: 'Get system statistics' }));
router.post('/templates/approve/:id', (req, res) => res.json({ message: 'Approve template' }));

export default router; 