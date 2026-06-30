import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Loader2, X, AlertCircle } from 'lucide-react';
import { memo, useCallback, useMemo } from 'react';
import { Spinner } from '../ui/spinner';

type FormState<T = unknown> = {
  handleSubmit: (onSubmit: (data: T) => void) => (e?: React.FormEvent) => void;
  formState: {
    isSubmitting: boolean;
    isValid: boolean;
    errors?: {
      root?: {
        message?: string;
      };
    };
  };
};

export interface CardWrapperProps<T = unknown> {
  title: string;
  description?: string;
  open?: boolean; // Optional for card, usually it's always visible if rendered
  onClose?: () => void;
  form?: FormState<T>;
  onSubmit?: (data: T) => void;
  loading?: boolean;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CardWrapper = memo<CardWrapperProps>(
  ({ title, description, open = false, onClose, form, onSubmit, loading = false, children, submitText = 'Submit', cancelText = 'Cancel', className, style }) => {
    const isSubmitting = form?.formState.isSubmitting;
    const rootError = form?.formState.errors?.root?.message;

    const handleSubmit = useCallback(
      (e?: React.FormEvent) => {
        e?.preventDefault();
        if (onSubmit && form) {
          form.handleSubmit(onSubmit)(e);
        }
      },
      [form, onSubmit],
    );

    const actions = useMemo(
      () => (
        <div className="flex items-center gap-3 justify-end mt-6 pt-4 border-t border-border/40">
          {onClose && (
            <Button variant="outline" onClick={onClose} disabled={isSubmitting} type="button" className="min-w-[100px]">
              {cancelText}
            </Button>
          )}
          {onSubmit && (
            <Button onClick={handleSubmit} disabled={isSubmitting} type="submit" className="min-w-[120px]">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitText}
            </Button>
          )}
        </div>
      ),
      [onClose, handleSubmit, isSubmitting, onSubmit, submitText, cancelText],
    );

    if (!open) return null;

    return (
      <Card style={style} className={cn('mt-10 gap-0 py-0 animate-in fade-in zoom-in-95 duration-300', 'overflow-hidden', className)}>
        <CardHeader className="border-b px-5 pt-5 pb-4! relative">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
            </div>
            {onClose && (
              <Button variant="link" size="icon" className="hover:bg-transparent" onClick={onClose} disabled={isSubmitting}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-5 relative min-h-[100px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center  z-50">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {children}
              {rootError && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{rootError}</AlertDescription>
                </Alert>
              )}
              {onSubmit || onClose ? actions : null}
            </form>
          )}
        </CardContent>
      </Card>
    );
  },
);
