import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import APPROVAL_TASK_CONSTANTS from '../../constants';
import { memo } from 'react';

export const ApprovalTaskCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${APPROVAL_TASK_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: APPROVAL_TASK_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${APPROVAL_TASK_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: APPROVAL_TASK_CONSTANTS.PERMISSIONS.MODULE,
                resource: APPROVAL_TASK_CONSTANTS.PERMISSIONS.RESOURCE,
                action: APPROVAL_TASK_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})