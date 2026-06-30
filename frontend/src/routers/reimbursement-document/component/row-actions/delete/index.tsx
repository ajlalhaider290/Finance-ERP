import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteReimbursementDocument } from '../../../service';
import REIMBURSEMENT_DOCUMENT_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const ReimbursementDocumentDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteReimbursementDocument,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [REIMBURSEMENT_DOCUMENT_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

ReimbursementDocumentDelete.displayName = 'ReimbursementDocumentDelete';

export default ReimbursementDocumentDelete;
