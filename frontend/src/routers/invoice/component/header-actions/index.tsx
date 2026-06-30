import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import INVOICE_CONSTANTS from '../../constants';
import { memo } from 'react';

export const InvoiceCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${INVOICE_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: INVOICE_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${INVOICE_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: INVOICE_CONSTANTS.PERMISSIONS.MODULE,
                resource: INVOICE_CONSTANTS.PERMISSIONS.RESOURCE,
                action: INVOICE_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})