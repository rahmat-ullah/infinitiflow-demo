import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

// Get environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Create a rate limiter with different settings for development and production
const rateLimiter = new RateLimiterMemory({
  points: isDevelopment 
    ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '1000') // More permissive for development
    : parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Stricter for production
  duration: isDevelopment 
    ? parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000') / 1000 // 1 minute for development
    : parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000, // 15 minutes for production
});

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Skip rate limiting in development if disabled
  if (isDevelopment && process.env.DISABLE_RATE_LIMIT === 'true') {
    return next();
  }

  try {
    await rateLimiter.consume(req.ip || 'unknown');
    next();
  } catch (rejRes: any) {
    const remainingPoints = rejRes?.remainingPoints || 0;
    const msBeforeNext = rejRes?.msBeforeNext || 0;
    
    res.set('Retry-After', Math.round(msBeforeNext / 1000).toString());
    res.set('X-RateLimit-Limit', isDevelopment ? '1000' : '100');
    res.set('X-RateLimit-Remaining', remainingPoints.toString());
    res.set('X-RateLimit-Reset', new Date(Date.now() + msBeforeNext).toISOString());
    
    res.status(429).json({
      error: 'Too Many Requests',
      message: `You have exceeded the rate limit. Please try again in ${Math.round(msBeforeNext / 1000)} seconds.`,
      retryAfter: Math.round(msBeforeNext / 1000),
      development: isDevelopment
    });
  }
};

export { rateLimiterMiddleware as rateLimiter }; 