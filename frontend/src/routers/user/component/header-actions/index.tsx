import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import USER_CONSTANTS from '../../constants';
import { memo } from 'react';

export const UserCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${USER_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: USER_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${USER_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: USER_CONSTANTS.PERMISSIONS.MODULE,
                resource: USER_CONSTANTS.PERMISSIONS.RESOURCE,
                action: USER_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})