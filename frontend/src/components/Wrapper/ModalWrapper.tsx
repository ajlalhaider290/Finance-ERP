import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Loader2, AlertCircle } from 'lucide-react';
import { memo, useCallback } from 'react';
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

export interface ModalWrapperProps<T = unknown> {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  form?: FormState<T>;
  onSubmit?: (data: T) => void;
  loading?: boolean;
  width?: number;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  className?: string;
}

export const ModalWrapper = memo<ModalWrapperProps>(
  ({ title, description, open, onClose, form, onSubmit, loading, width = 800, children, submitText = 'Submit', cancelText = 'Cancel', className }) => {
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

    return (
      <Dialog open={!!open} onOpenChange={() => onClose()}>
        <DialogContent
          className={cn('max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden', 'backdrop-blur-xl', 'border  shadow-2xl transition-all duration-300', className)}
          style={{ width: width, maxWidth: '95vw' }}>
          <DialogHeader className="px-4 md:px-6 py-5 border-b text-left">
            <div>
              <DialogTitle className="text-xl font-semibold text-foreground">{title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
            <div className="relative min-h-[100px]">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px] z-50 rounded-lg">
                  <Spinner />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {children}
                </form>
              )}
            </div>
          </div>
          {rootError && (
            <div className="px-4 md:px-6 pt-3">
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{rootError}</AlertDescription>
              </Alert>
            </div>
          )}
          <DialogFooter className="justify-end items-end px-4 md:px-6 py-4 border-t bg-muted/5">
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} type="button" className="min-w-[80px]">
                {cancelText}
              </Button>
              {onSubmit && (
                <Button onClick={handleSubmit} disabled={isSubmitting} type="submit" className="min-w-[100px]">
                  {isSubmitting && <Loader2 className="animate-spin" />}
                  {submitText}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
