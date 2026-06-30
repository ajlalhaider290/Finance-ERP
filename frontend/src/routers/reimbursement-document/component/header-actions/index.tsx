import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import REIMBURSEMENT_DOCUMENT_CONSTANTS from '../../constants';
import { memo } from 'react';

export const ReimbursementDocumentCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: REIMBURSEMENT_DOCUMENT_CONSTANTS.PERMISSIONS.MODULE,
                resource: REIMBURSEMENT_DOCUMENT_CONSTANTS.PERMISSIONS.RESOURCE,
                action: REIMBURSEMENT_DOCUMENT_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})