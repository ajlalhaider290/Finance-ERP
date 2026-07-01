import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ApiErrorResponse } from '@/types/api';
import { toast } from 'sonner';

// Universal form error handler
// `form` typed loosely (3-generic / any) so callers using `useForm<T>()` from any
// react-hook-form ≥7.x version assign cleanly without 3rd-generic friction.
export function handleApiFormErrors<T extends FieldValues>(error: unknown, form: UseFormReturn<T, unknown, T>) {
  const apiError = (error as { response?: { data?: ApiErrorResponse<string> } }).response?.data;

  if (apiError?.errors?.length) {
    apiError.errors.forEach((e) => {
      form.setError(e.field as Path<T>, { message: e.message });
    });
  } else if (apiError?.message) {
    toast.error(apiError.message);
  } else {
    toast.error('Request failed. Please try again.');
  }
}
