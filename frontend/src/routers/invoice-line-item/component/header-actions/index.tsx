import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import INVOICE_LINE_ITEM_CONSTANTS from '../../constants';
import { memo } from 'react';

export const InvoiceLineItemCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${INVOICE_LINE_ITEM_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: INVOICE_LINE_ITEM_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${INVOICE_LINE_ITEM_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: INVOICE_LINE_ITEM_CONSTANTS.PERMISSIONS.MODULE,
                resource: INVOICE_LINE_ITEM_CONSTANTS.PERMISSIONS.RESOURCE,
                action: INVOICE_LINE_ITEM_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})