import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteExpenseCategory } from '../../../service';
import EXPENSE_CATEGORY_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const ExpenseCategoryDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteExpenseCategory,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${EXPENSE_CATEGORY_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [EXPENSE_CATEGORY_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${EXPENSE_CATEGORY_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

ExpenseCategoryDelete.displayName = 'ExpenseCategoryDelete';

export default ExpenseCategoryDelete;
