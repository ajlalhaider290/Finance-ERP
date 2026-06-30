import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import COMPANY_ENTITY_CONSTANTS from '../../constants';
import { memo } from 'react';

export const CompanyEntityCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${COMPANY_ENTITY_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: COMPANY_ENTITY_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${COMPANY_ENTITY_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: COMPANY_ENTITY_CONSTANTS.PERMISSIONS.MODULE,
                resource: COMPANY_ENTITY_CONSTANTS.PERMISSIONS.RESOURCE,
                action: COMPANY_ENTITY_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})