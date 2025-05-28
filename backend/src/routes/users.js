import express from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  updateProfile,
  deleteAccount,
  updatePreferences,
  getUsageStats,
  uploadAvatar,
  removeAvatar
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for avatar uploads
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// All routes are protected
router.use(protect);

// Profile routes
router.get('/profile', getProfile);
router.patch('/profile', [
  body('firstName').optional().trim().isLength({ min: 1 }).withMessage('First name cannot be empty'),
  body('lastName').optional().trim().isLength({ min: 1 }).withMessage('Last name cannot be empty'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required')
], updateProfile);

// Avatar routes
router.post('/avatar', upload.single('avatar'), uploadAvatar);
router.delete('/avatar', removeAvatar);

// Preferences routes
router.patch('/preferences', updatePreferences);

// Usage and stats
router.get('/usage', getUsageStats);

// Account management
router.delete('/account', deleteAccount);

export default router; 