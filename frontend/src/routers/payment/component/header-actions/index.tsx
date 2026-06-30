import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import PAYMENT_CONSTANTS from '../../constants';
import { memo } from 'react';

export const PaymentCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${PAYMENT_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: PAYMENT_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${PAYMENT_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: PAYMENT_CONSTANTS.PERMISSIONS.MODULE,
                resource: PAYMENT_CONSTANTS.PERMISSIONS.RESOURCE,
                action: PAYMENT_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})