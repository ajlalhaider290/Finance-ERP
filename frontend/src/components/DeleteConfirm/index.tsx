import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { Loader2, Trash2 } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type DeleteConfirmProps = {
  handleDelete: () => void;
  curObjName: string;
  isDeleteLoading?: boolean;
  mode?: string;
};

const DeleteConfirm = memo<DeleteConfirmProps>(({ handleDelete, curObjName, isDeleteLoading = false, mode: targetMode = 'delete' }) => {
  const { t } = useTranslation(['common']);
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, curObjName));
  const { isOpen, mode, label } = selectedObj || {};
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    if (!isDeleteLoading) {
      dispatch(resetSelectedObj(curObjName));
    }
  }, [isDeleteLoading, dispatch, curObjName]);

  const handleConfirmDelete = useCallback(() => {
    if (!isDeleteLoading) {
      handleDelete();
    }
  }, [isDeleteLoading, handleDelete]);

  return (
    <Dialog
      open={!!(isOpen && mode === targetMode)}
      onOpenChange={(open) => {
        if (!open && !isDeleteLoading) {
          handleClose();
        }
      }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-left">
          <DialogTitle className="flex items-center justify-center gap-3 sm:justify-start text-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <span className="font-semibold">{t('confirmDelete')}</span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t('areYouSureToDelete')} {label ? `"${label}"` : ''}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('areYouSureToDelete')} <strong className="text-foreground">{label ? `"${label}"` : ''}</strong>
            </p>
            <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleteLoading} className="w-full sm:w-auto order-2 sm:order-1">
            {t('cancel')}
          </Button>

          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isDeleteLoading}
            className={cn('w-full sm:w-auto order-1 sm:order-2 min-w-[100px]', isDeleteLoading && 'cursor-not-allowed')}>
            {isDeleteLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                <span>{t('delete')}</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

DeleteConfirm.displayName = 'DeleteConfirm';
export default DeleteConfirm;
