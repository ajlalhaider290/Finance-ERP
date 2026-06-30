interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface ErrorResponse {
  success: boolean;
  error: string;
  message: string;
  errors: ValidationError[];
  timestamp: string;
}

type AxiosLikeError = {
  response?: { data?: Partial<ErrorResponse> & { message?: string } };
  data?: { message?: string };
  message?: string;
};

export const CleanError = (error: unknown): string => {
  const e = error as AxiosLikeError | null | undefined;

  if (e && e.response && e.response.data) {
    return e.response.data.message || 'An error occurred';
  } else if (e && typeof e === 'object' && 'data' in e && e.data) {
    return e.data.message || 'An error occurred';
  } else if (e && typeof e === 'object' && 'message' in e && e.message) {
    return e.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return 'An unexpected error occurred';
  }
};

export const getFieldError = (error: unknown, fieldName: string): string => {
  const e = error as AxiosLikeError | null | undefined;
  let responseData: ErrorResponse | null = null;
  if (e && e.response && e.response.data) {
    responseData = e.response.data as ErrorResponse;
  }
  if (!responseData?.errors || !Array.isArray(responseData?.errors)) {
    return '';
  }

  const fieldError = responseData?.errors.find((error) => error.field === fieldName);
  return fieldError ? fieldError.message : '';
};

export const getFieldErrorFromAxios = (axiosError: unknown, fieldName: string): string => {
  const e = axiosError as AxiosLikeError | null | undefined;
  const errors = e?.response?.data?.errors;
  if (!errors || !Array.isArray(errors)) {
    return '';
  }

  const fieldError = errors.find((err: ValidationError) => err.field === fieldName);
  return fieldError ? fieldError.message : '';
};
