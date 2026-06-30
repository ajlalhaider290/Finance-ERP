import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import EXPENSE_CATEGORY_CONSTANTS from '../../constants';
import { memo } from 'react';

export const ExpenseCategoryCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${EXPENSE_CATEGORY_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${EXPENSE_CATEGORY_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: EXPENSE_CATEGORY_CONSTANTS.PERMISSIONS.MODULE,
                resource: EXPENSE_CATEGORY_CONSTANTS.PERMISSIONS.RESOURCE,
                action: EXPENSE_CATEGORY_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})