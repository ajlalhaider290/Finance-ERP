import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deletePayment } from '../../../service';
import PAYMENT_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const PaymentDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, PAYMENT_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deletePayment,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(PAYMENT_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${PAYMENT_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [PAYMENT_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${PAYMENT_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={PAYMENT_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

PaymentDelete.displayName = 'PaymentDelete';

export default PaymentDelete;
