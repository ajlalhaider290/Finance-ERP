import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteTaxCode } from '../../../service';
import TAX_CODE_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const TaxCodeDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TAX_CODE_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteTaxCode,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(TAX_CODE_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${TAX_CODE_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [TAX_CODE_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${TAX_CODE_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={TAX_CODE_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

TaxCodeDelete.displayName = 'TaxCodeDelete';

export default TaxCodeDelete;
