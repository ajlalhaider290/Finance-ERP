import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
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

export interface PageFormWrapperProps<T = unknown> {
  title: string;
  description?: string;
  backUrl?: string;
  form?: FormState<T>;
  onSubmit?: (data: T) => void;
  loading?: boolean;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  className?: string;
  headerActions?: React.ReactNode;
}

export const PageFormWrapper = memo<PageFormWrapperProps>(
  ({ title, description, backUrl, form, onSubmit, loading, children, submitText = 'Submit', cancelText = 'Cancel', className, headerActions }) => {
    const navigate = useNavigate();

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

    const handleBack = useCallback(() => {
      if (backUrl) {
        navigate(backUrl);
      } else {
        navigate(-1);
      }
    }, [navigate, backUrl]);

    return (
      <div className={cn('space-y-5', className)}>
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={handleBack} type="button" className="shrink-0">
                <ArrowLeft className="size-4" />
              </Button>
              <div>
                <CardTitle className="text-xl">{title}</CardTitle>
                {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
              </div>
            </div>
            {headerActions && <div className="flex flex-col sm:flex-row gap-2">{headerActions}</div>}
          </CardHeader>
          <CardContent className="px-4 md:px-6 relative">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Spinner />
              </div>
            ) : onSubmit ? (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
                {children}
                {rootError && (
                  <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{rootError}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={handleBack} disabled={isSubmitting} type="button" className="min-w-[100px]">
                    {cancelText}
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting} type="submit" className="min-w-[120px]">
                    {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                    {submitText}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-500">{children}</div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  },
);

PageFormWrapper.displayName = 'PageFormWrapper';
