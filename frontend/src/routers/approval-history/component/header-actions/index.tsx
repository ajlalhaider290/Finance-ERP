import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import APPROVAL_HISTORY_CONSTANTS from '../../constants';
import { memo } from 'react';

export const ApprovalHistoryCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${APPROVAL_HISTORY_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${APPROVAL_HISTORY_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.MODULE,
                resource: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.RESOURCE,
                action: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})