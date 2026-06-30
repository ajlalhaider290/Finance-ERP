import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { Loader2 } from 'lucide-react';
import { memo, useCallback } from 'react';

type ProceedConfirmProps = {
  handleProceed: () => void;
  curObjName: string;
  isLoading?: boolean;
  title?: string;
  description?: string;
  submitText?: string;
  cancelText?: string;
  mode?: string;
};

const ProceedConfirm = memo<ProceedConfirmProps>(
  ({
    handleProceed,
    curObjName,
    isLoading = false,
    title = 'Confirm',
    description = 'This action cannot be undone.',
    submitText = 'Submit',
    cancelText = 'Cancel',
    mode: targetMode,
  }) => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, curObjName));
    const { isOpen, mode, label } = selectedObj || {};

    const dispatch = useAppDispatch();

    const handleClose = useCallback(() => {
      if (!isLoading) {
        dispatch(resetSelectedObj(curObjName));
      }
    }, [isLoading, dispatch, curObjName]);

    const handleConfirmProceed = useCallback(() => {
      if (!isLoading) {
        handleProceed();
      }
    }, [isLoading, handleProceed]);

    return (
      <Dialog
        open={!!(isOpen && (!targetMode || mode === targetMode))}
        onOpenChange={(open) => {
          if (!open && !isLoading) {
            handleClose();
          }
        }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center sm:text-left">
            <DialogTitle className="flex items-center justify-center gap-3 sm:justify-start text-lg">
              <span className="font-semibold">{title}</span>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description} <strong className="text-foreground">{label && `"${label}"`}</strong>?
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isLoading} className="w-full sm:w-auto order-2 sm:order-1">
              {cancelText}
            </Button>

            <Button onClick={handleConfirmProceed} disabled={isLoading} className={cn('w-full sm:w-auto order-1 sm:order-2 min-w-[100px]', isLoading && 'cursor-not-allowed')}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

ProceedConfirm.displayName = 'ProceedConfirm';
export default ProceedConfirm;
