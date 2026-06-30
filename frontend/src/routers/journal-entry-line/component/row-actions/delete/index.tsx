import { memo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import DeleteConfirm from '@/components/DeleteConfirm';
import { deleteJournalEntryLine } from '../../../service';
import JOURNAL_ENTRY_LINE_CONSTANTS from '../../../constants';
import { toast } from 'sonner';
import axios from 'axios';

export const JournalEntryLineDelete = memo(() => {
    const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY));
    const { primaryKeys } = selectedObj || {};
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteJournalEntryLine,
    });

    const handleClose = useCallback(() => {
        dispatch(resetSelectedObj(JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY));
    }, [dispatch]);

    const handleDelete = useCallback(async () => {
        try {
            await mutateAsync(primaryKeys);
            toast.success(`${JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_NAME} deleted successfully`);
            handleClose();
            queryClient.invalidateQueries({ queryKey: [JOURNAL_ENTRY_LINE_CONSTANTS.QUERY_KEY] });
        } catch (error) {
            const message = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : `Failed to delete ${JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_NAME}`;
            toast.error(message);
        }
    }, [mutateAsync, primaryKeys, queryClient, handleClose]);

    return (
        <DeleteConfirm
            handleDelete={handleDelete}
            curObjName={JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY}
            isDeleteLoading={isPending}
        />
    );
});

JournalEntryLineDelete.displayName = 'JournalEntryLineDelete';

export default JournalEntryLineDelete;
