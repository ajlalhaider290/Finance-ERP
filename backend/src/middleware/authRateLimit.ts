import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { tooManyRequests } from '../errors';

// 5 requests / 60s per IP for sensitive auth endpoints.
// Note: multi-instance deployments should swap this for the Redis backend of rate-limiter-flexible.
const authRateLimiter = new RateLimiterMemory({ points: 5, duration: 60 });

export const authRateLimit = async (req: Request, _res: Response, next: NextFunction) => {
  const key = req.ip || 'unknown';
  try {
    await authRateLimiter.consume(key);
    next();
  } catch {
    next(tooManyRequests());
  }
};
