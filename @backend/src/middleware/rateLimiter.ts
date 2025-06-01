import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

// Create a rate limiter
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip || 'unknown',
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Number of requests
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000, // Per 15 minutes (in seconds)
});

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await rateLimiter.consume(req.ip || 'unknown');
    next();
  } catch (rejRes: any) {
    const remainingPoints = rejRes?.remainingPoints || 0;
    const msBeforeNext = rejRes?.msBeforeNext || 0;
    
    res.set('Retry-After', Math.round(msBeforeNext / 1000).toString());
    res.set('X-RateLimit-Limit', process.env.RATE_LIMIT_MAX_REQUESTS || '100');
    res.set('X-RateLimit-Remaining', remainingPoints.toString());
    res.set('X-RateLimit-Reset', new Date(Date.now() + msBeforeNext).toISOString());
    
    res.status(429).json({
      error: 'Too Many Requests',
      message: 'You have exceeded the rate limit. Please try again later.',
      retryAfter: Math.round(msBeforeNext / 1000)
    });
  }
};

export { rateLimiterMiddleware as rateLimiter }; 