import { AppError } from './AppError';
export { AppError };

export const notFound = (resource: string, errorCode?: string) =>
  new AppError({
    statusCode: 404,
    errorCode: errorCode ?? `INVALID_${resource.toUpperCase()}_ID`,
    message: `${resource} not found`,
  });

export const badRequest = (message: string, errorCode?: string) =>
  new AppError({
    statusCode: 400,
    errorCode: errorCode ?? 'BAD_REQUEST',
    message,
  });

export const unauthorized = (message?: string, errorCode?: string) =>
  new AppError({
    statusCode: 401,
    errorCode: errorCode ?? 'UNAUTHORIZED',
    message: message ?? 'Unauthorized',
  });

export const forbidden = (message?: string) =>
  new AppError({
    statusCode: 403,
    errorCode: 'FORBIDDEN',
    message: message ?? 'Forbidden',
  });

export const conflict = (message: string, errorCode?: string) =>
  new AppError({
    statusCode: 409,
    errorCode: errorCode ?? 'CONFLICT',
    message,
  });

export const validationError = (message: string, details?: unknown) =>
  new AppError({
    statusCode: 400,
    errorCode: 'VALIDATION_ERROR',
    message,
    details,
  });

export const tooManyRequests = (message?: string, errorCode?: string) =>
  new AppError({
    statusCode: 429,
    errorCode: errorCode ?? 'RATE_LIMIT_EXCEEDED',
    message: message ?? 'Too many requests. Please try again later.',
  });
