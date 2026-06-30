// API Error response type matching backend format
export interface ApiErrorResponse<T = string> {
  message: string;
  statusCode: number;
  errorCode?: string;
  errors?: Array<{
    field: T;
    message: string;
  }>;
}
