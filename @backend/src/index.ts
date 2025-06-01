import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import { createLogger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { connectDatabase } from './config/database.js';
import apiRoutes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const logger = createLogger();

// Connect to MongoDB
connectDatabase();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
app.use('/api', rateLimiter);

// Static file serving for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Body parsing middleware (increased limits for image uploads)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: 'MongoDB'
  });
});

// API routes
app.use('/api', apiRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
  logger.info(`📚 API documentation: http://localhost:${PORT}/api`);
  logger.info(`📁 Static files: http://localhost:${PORT}/uploads`);
});

export default app; 