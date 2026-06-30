import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2, X, Edit } from 'lucide-react';

type DisplayProps = {
  open: boolean;
  onClose: () => void;
  onLink?: () => void;
  title: string;
  width?: number;
  loading?: boolean;
  children: React.ReactNode;
  type: 'drawer' | 'modal' | 'card';
  style?: React.CSSProperties;
  side?: 'left' | 'right' | 'top' | 'bottom';
};

const Display = memo<DisplayProps>(({ type, open, title, loading, width = 800, children, onClose, onLink, style, side = 'right' }) => {
  const { t } = useTranslation(['common']);

  const closeButton = useMemo(
    () => (
      <Button variant="outline" size="sm" onClick={onClose}>
        <X className="h-4 w-4 me-1" />
        {t('close')}
      </Button>
    ),
    [onClose, t],
  );

  const linkButton = useMemo(
    () =>
      onLink ? (
        <Button variant="outline" size="sm" onClick={onLink}>
          <Edit className="h-4 w-4 me-1" />
          {t('edit')}
        </Button>
      ) : null,
    [onLink, t],
  );

  const content = useMemo(
    () => (
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        {children}
      </div>
    ),
    [loading, children],
  );

  const sheetStyle = useMemo(() => {
    const sheetWidth = side === 'bottom' || side === 'top' ? '100%' : width;
    return side === 'bottom' || side === 'top' ? { width: sheetWidth, maxHeight: '90vh' } : { width: sheetWidth, maxWidth: '90vw' };
  }, [side, width]);

  const components = useMemo(
    () => ({
      modal: (
        <Dialog
          open={!!open}
          onOpenChange={(isOpen) => {
            if (!isOpen) onClose();
          }}>
          <DialogContent style={sheetStyle} className="sm:max-w-none">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>{title}</DialogTitle>
                <div className="flex gap-2">
                  {linkButton}
                  {closeButton}
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4">{content}</div>
          </DialogContent>
        </Dialog>
      ),
      drawer: (
        <Sheet
          open={!!open}
          onOpenChange={(isOpen) => {
            if (!isOpen) onClose();
          }}>
          <SheetContent side={side} style={{ width }} className="sm:max-w-none">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>{title}</SheetTitle>
                <div className="flex gap-2">
                  {linkButton}
                  {closeButton}
                </div>
              </div>
            </SheetHeader>
            <div className="mt-4 flex-1 overflow-auto">{content}</div>
          </SheetContent>
        </Sheet>
      ),
      card: (
        <Card style={style}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{title}</CardTitle>
              <div className="flex gap-2">
                {linkButton}
                {closeButton}
              </div>
            </div>
          </CardHeader>
          <CardContent>{content}</CardContent>
        </Card>
      ),
    }),
    [open, title, width, content, closeButton, linkButton, style, onClose, sheetStyle, side],
  );

  if (!open && type === 'card') return null;

  return components[type] || null;
});

Display.displayName = 'Display';

export default Display;
