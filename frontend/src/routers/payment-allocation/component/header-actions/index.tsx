import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import PAYMENT_ALLOCATION_CONSTANTS from '../../constants';
import { memo } from 'react';

export const PaymentAllocationCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${PAYMENT_ALLOCATION_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: PAYMENT_ALLOCATION_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${PAYMENT_ALLOCATION_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: PAYMENT_ALLOCATION_CONSTANTS.PERMISSIONS.MODULE,
                resource: PAYMENT_ALLOCATION_CONSTANTS.PERMISSIONS.RESOURCE,
                action: PAYMENT_ALLOCATION_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})