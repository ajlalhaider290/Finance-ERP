import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import CUSTOMER_CONSTANTS from '../../constants';
import { memo } from 'react';

export const CustomerCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${CUSTOMER_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: CUSTOMER_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${CUSTOMER_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: CUSTOMER_CONSTANTS.PERMISSIONS.MODULE,
                resource: CUSTOMER_CONSTANTS.PERMISSIONS.RESOURCE,
                action: CUSTOMER_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})