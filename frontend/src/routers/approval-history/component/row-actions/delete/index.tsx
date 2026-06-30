import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteApprovalHistory } from '../../../service';
import APPROVAL_HISTORY_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const ApprovalHistoryDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteApprovalHistory,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${APPROVAL_HISTORY_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [APPROVAL_HISTORY_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${APPROVAL_HISTORY_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

ApprovalHistoryDelete.displayName = 'ApprovalHistoryDelete';

export default ApprovalHistoryDelete;
