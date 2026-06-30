export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(params: {
    statusCode: number;
    errorCode: string;
    message: string;
    details?: unknown;
    isOperational?: boolean;
  }) {
    super(params.message);
    this.statusCode = params.statusCode;
    this.errorCode = params.errorCode;
    this.isOperational = params.isOperational ?? true;
    this.details = params.details;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
