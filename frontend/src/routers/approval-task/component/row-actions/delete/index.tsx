import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteApprovalTask } from '../../../service';
import APPROVAL_TASK_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const ApprovalTaskDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, APPROVAL_TASK_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteApprovalTask,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(APPROVAL_TASK_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${APPROVAL_TASK_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [APPROVAL_TASK_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${APPROVAL_TASK_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={APPROVAL_TASK_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

ApprovalTaskDelete.displayName = 'ApprovalTaskDelete';

export default ApprovalTaskDelete;
