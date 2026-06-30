import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import VENDOR_CONSTANTS from '../../constants';
import { memo } from 'react';

export const VendorCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${VENDOR_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: VENDOR_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${VENDOR_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: VENDOR_CONSTANTS.PERMISSIONS.MODULE,
                resource: VENDOR_CONSTANTS.PERMISSIONS.RESOURCE,
                action: VENDOR_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})