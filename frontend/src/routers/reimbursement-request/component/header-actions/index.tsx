import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import REIMBURSEMENT_REQUEST_CONSTANTS from '../../constants';
import { memo } from 'react';

export const ReimbursementRequestCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label="Create Request"
            onClick={() => dispatch(setSelectedObj({
                objKey: REIMBURSEMENT_REQUEST_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: "Create Request"
            }))}
            permission={{
                module: REIMBURSEMENT_REQUEST_CONSTANTS.PERMISSIONS.MODULE,
                resource: REIMBURSEMENT_REQUEST_CONSTANTS.PERMISSIONS.RESOURCE,
                action: REIMBURSEMENT_REQUEST_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})
