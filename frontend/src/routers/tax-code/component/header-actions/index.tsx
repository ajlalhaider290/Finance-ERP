import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import TAX_CODE_CONSTANTS from '../../constants';
import { memo } from 'react';

export const TaxCodeCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${TAX_CODE_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: TAX_CODE_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${TAX_CODE_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: TAX_CODE_CONSTANTS.PERMISSIONS.MODULE,
                resource: TAX_CODE_CONSTANTS.PERMISSIONS.RESOURCE,
                action: TAX_CODE_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})