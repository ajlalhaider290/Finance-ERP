import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteIntercompanySettlementRecord } from '../../../service';
import INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const IntercompanySettlementRecordDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteIntercompanySettlementRecord,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

IntercompanySettlementRecordDelete.displayName = 'IntercompanySettlementRecordDelete';

export default IntercompanySettlementRecordDelete;
