import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import JOURNAL_ENTRY_CONSTANTS from '../../constants';
import { memo } from 'react';

export const JournalEntryCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${JOURNAL_ENTRY_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: JOURNAL_ENTRY_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${JOURNAL_ENTRY_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.MODULE,
                resource: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.RESOURCE,
                action: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})