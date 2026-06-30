import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Loader2, AlertCircle } from 'lucide-react';
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

export interface DrawerWrapperProps<T = unknown> {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  form?: FormState<T>;
  onSubmit?: (data: T) => void;
  loading?: boolean;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  className?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

export const DrawerWrapper = memo<DrawerWrapperProps>(
  ({
    title,
    description,
    open = false,
    onClose,
    form,
    onSubmit,
    loading,
    width = 700,
    height,
    children,
    submitText = 'Submit',
    cancelText = 'Cancel',
    className,
    side = 'right',
  }) => {
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

    const isHorizontal = side === 'left' || side === 'right';

    const animationClass = useMemo(() => {
      switch (side) {
        case 'left':
          return 'slide-in-from-left-4';
        case 'top':
          return 'slide-in-from-top-4';
        case 'bottom':
          return 'slide-in-from-bottom-4';
        case 'right':
        default:
          return 'slide-in-from-right-4';
      }
    }, [side]);

    return (
      <Sheet open={!!open} onOpenChange={(val) => !val && onClose()}>
        <SheetContent
          side={side}
          className={cn('flex flex-col p-0 gap-0 shadow-2xl transition-all duration-500', isHorizontal ? 'h-full' : 'w-full', className)}
          style={isHorizontal ? { width: width, maxWidth: '95vw' } : { height: height || 'auto', maxHeight: '95vh' }}>
          <SheetHeader className="px-4 md:px-6 py-4 border-b">
            <div className="">
              <SheetTitle className="text-xl font-semibold text-foreground">{title}</SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">{description}</SheetDescription>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px] z-50 rounded-lg">
                <Spinner />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={cn('space-y-6 animate-in fade-in duration-500', animationClass)}>
                {children}
              </form>
            )}
          </div>

          {rootError && (
            <div className="px-4 md:px-6 pt-3">
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{rootError}</AlertDescription>
              </Alert>
            </div>
          )}

          <SheetFooter className="px-4 md:px-6 py-4 justify-end items-end border-t">
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting} type="button" className="flex-1 sm:flex-none sm:min-w-[100px]">
                {cancelText}
              </Button>
              {onSubmit && (
                <Button onClick={handleSubmit} disabled={isSubmitting} type="submit" className="flex-1 sm:flex-none sm:min-w-[120px]">
                  {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                  {submitText}
                </Button>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
);
