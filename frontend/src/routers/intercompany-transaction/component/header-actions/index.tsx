import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import INTERCOMPANY_TRANSACTION_CONSTANTS from '../../constants';
import { memo } from 'react';

export const IntercompanyTransactionCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: INTERCOMPANY_TRANSACTION_CONSTANTS.PERMISSIONS.MODULE,
                resource: INTERCOMPANY_TRANSACTION_CONSTANTS.PERMISSIONS.RESOURCE,
                action: INTERCOMPANY_TRANSACTION_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})