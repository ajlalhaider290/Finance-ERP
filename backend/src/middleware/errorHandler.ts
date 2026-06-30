import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import logger from '../logger';
import { env } from '../config/env';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Structured error logging
  logger.error({ err, url: req.originalUrl, method: req.method }, 'Unhandled error');

  // 1. AppError — the standard path
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message,
      ...(err.details !== undefined && Array.isArray(err.details)
        ? { errors: err.details }
        : err.details !== undefined ? { details: err.details } : {}),
      ...(env.ENVIRONMENT === 'development' && { stack: err.stack }),
    });
    return;
  }

  // 2. Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    res.status(400).json({
      errorCode: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: err.message,
    });
    return;
  }

  // 3. JWT errors
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      errorCode: 'UNAUTHORIZED',
      message: 'Invalid token or no token provided',
    });
    return;
  }

  // 4. Sequelize foreign key constraint errors
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    const fkError = err as any;
    const relatedTable = fkError.table || 'related records';
    res.status(409).json({
      errorCode: 'FOREIGN_KEY_CONSTRAINT',
      message: `This record cannot be deleted because it is still referenced by '${relatedTable}'. Please remove the associated ${relatedTable} first.`,
      ...(env.ENVIRONMENT === 'development' && { details: err.message, stack: err.stack }),
    });
    return;
  }

  // 5. Fallback for unknown errors
  const statusCode = (err as any).statusCode || 500;
  res.status(statusCode).json({
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Internal server error',
    ...(env.ENVIRONMENT === 'development' && { stack: err.stack }),
  });
};
