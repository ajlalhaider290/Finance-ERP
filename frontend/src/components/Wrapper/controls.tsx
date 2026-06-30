import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../ui/spinner';

type ComponentType = 'drawer' | 'modal' | 'card';

type FormState<T = unknown> = {
  handleSubmit: (onSubmit: (data: T) => void) => (e?: React.FormEvent) => void;
  formState: {
    isSubmitting: boolean;
    isValid: boolean;
  };
};

type ControlsProps<T = unknown> = {
  title: string;
  open: boolean;
  onClose: () => void;
  form?: FormState<T>;
  onSubmit?: (data: T) => void;
  loading?: boolean;
  width?: number;
  children: React.ReactNode;
  type: ComponentType;
  style?: React.CSSProperties;
  description?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
};

const Controls = memo<ControlsProps>(({ title, open = false, form, onSubmit, loading = false, children, type, style, width = 800, onClose, description, side = 'right' }) => {
  const { t } = useTranslation(['common']);

  const isSubmitting = form?.formState.isSubmitting;

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
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onClose} disabled={isSubmitting} type="button" className="min-w-[80px]">
          {t('cancel')}
        </Button>
        {onSubmit && (
          <Button onClick={handleSubmit} disabled={isSubmitting} type="submit" className="min-w-[100px]">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            submit
          </Button>
        )}
      </div>
    ),
    [t, onClose, handleSubmit, isSubmitting, onSubmit],
  );

  const wrappedContent = useMemo(
    () => (
      <div className="relative">
        {loading ? (
          <div className="flex items-center justify-center z-50 rounded-lg h-20">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-1">
            {children}
          </form>
        )}
      </div>
    ),
    [loading, handleSubmit, children],
  );

  const sheetStyle = useMemo(() => {
    const sheetWidth = side === 'bottom' || side === 'top' ? '100%' : width;
    return side === 'bottom' || side === 'top' ? { width: sheetWidth, maxHeight: '90vh' } : { width: sheetWidth, maxWidth: '90vw' };
  }, [side, width]);

  const components = useMemo(
    () => ({
      drawer: (
        <Sheet open={!!open} onOpenChange={() => onClose()}>
          <SheetContent side={side} className={cn('flex flex-col h-full p-0 gap-0 border-l', 'backdrop-blur')} style={sheetStyle}>
            <SheetHeader className="shrink-0 px-6 py-4 border-b">
              <div className="text-left">
                <SheetTitle className="text-xl font-semibold">{title}</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground mt-1">{description && <>{description}</>}</SheetDescription>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-4">{wrappedContent}</div>
            </div>

            <SheetFooter className="shrink-0 px-6 py-4 border-t border-border/40 bg-muted/20">{actions}</SheetFooter>
          </SheetContent>
        </Sheet>
      ),

      modal: (
        <Dialog open={!!open} onOpenChange={() => onClose()}>
          <DialogContent className={cn('max-h-[90vh] flex flex-col gap-0 p-0', 'backdrop-blur', 'border border-border/40 shadow-lg')} style={{ width }}>
            <DialogHeader className="shrink-0 px-6 py-4 border-b">
              <DialogTitle className="text-xl font-semibold text-foreground">{title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 py-4">{wrappedContent}</div>

            <DialogFooter className="shrink-0 px-6 py-4 border-t border-border/40 bg-muted/10">{actions}</DialogFooter>
          </DialogContent>
        </Dialog>
      ),

      card: open ? (
        <Card style={style} className="border border-border/40 shadow-sm bg-background/50 backdrop-blur mt-5">
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">{wrappedContent}</CardContent>
        </Card>
      ) : null,
    }),
    [open, width, title, description, wrappedContent, actions, style, onClose, side, sheetStyle],
  );

  return components[type] ?? null;
});

Controls.displayName = 'Controls';

export default Controls;
