import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// Placeholder routes - will implement controllers later
router.get('/', (req, res) => res.json({ message: 'Get subscription info' }));
router.post('/create', (req, res) => res.json({ message: 'Create subscription' }));
router.patch('/upgrade', (req, res) => res.json({ message: 'Upgrade subscription' }));
router.patch('/cancel', (req, res) => res.json({ message: 'Cancel subscription' }));
router.get('/billing-history', (req, res) => res.json({ message: 'Get billing history' }));

export default router; 