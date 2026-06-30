import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../errors';

export const validateZodSchema = (schema: z.ZodSchema, segment: 'body' | 'query' | 'params') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[segment];
      const result = await schema.safeParseAsync(data);

      if (!result.success) {
        const formattedErrors = result.error.issues.map((issue) => {
          const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
          return {
            field: path,
            message: issue.message,
            code: issue.code,
            received: issue.code === 'invalid_type' ? (issue as any).received : undefined,
          };
        });

        throw new AppError({
          statusCode: 400,
          errorCode: 'VALIDATION_ERROR',
          message: `Validation failed for ${segment}`,
          details: formattedErrors,
        });
      }

      // Only replace the segment if it's not query (since query is read-only)
      if (segment !== 'query') {
        req[segment] = result.data;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

