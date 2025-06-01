import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

// Ensure upload directories exist
const blogUploadDir = path.join(process.cwd(), 'uploads', 'blog-images');
const testimonialUploadDir = path.join(process.cwd(), 'uploads', 'testimonial-images');

if (!fs.existsSync(blogUploadDir)) {
  fs.mkdirSync(blogUploadDir, { recursive: true });
}

if (!fs.existsSync(testimonialUploadDir)) {
  fs.mkdirSync(testimonialUploadDir, { recursive: true });
}

// Create storage configuration for different types
const createStorage = (uploadDir: string) => multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Generate unique filename with original extension
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter for images only
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Multer configurations for different types
const blogUploadConfig = multer({
  storage: createStorage(blogUploadDir),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files per request
  }
});

const testimonialUploadConfig = multer({
  storage: createStorage(testimonialUploadDir),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only single file for testimonials
  }
});

// Legacy configuration for backward compatibility
export const uploadConfig = blogUploadConfig;

// Blog image uploads
export const uploadSingle = blogUploadConfig.single('image');
export const uploadMultiple = blogUploadConfig.array('images', 10);

// Testimonial image uploads
export const uploadTestimonialImage = testimonialUploadConfig.single('image');

// Helper functions to get file URLs
export const getImageUrl = (filename: string): string => {
  return `/uploads/blog-images/${filename}`;
};

export const getTestimonialImageUrl = (filename: string): string => {
  return `/uploads/testimonial-images/${filename}`;
};

// Helper functions to delete files
export const deleteImage = (filename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(blogUploadDir, filename);
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const deleteTestimonialImage = (filename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(testimonialUploadDir, filename);
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}; 