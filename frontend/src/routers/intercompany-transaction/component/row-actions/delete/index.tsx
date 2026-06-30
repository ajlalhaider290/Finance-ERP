import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteIntercompanyTransaction } from '../../../service';
import INTERCOMPANY_TRANSACTION_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const IntercompanyTransactionDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteIntercompanyTransaction,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [INTERCOMPANY_TRANSACTION_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

IntercompanyTransactionDelete.displayName = 'IntercompanyTransactionDelete';

export default IntercompanyTransactionDelete;
