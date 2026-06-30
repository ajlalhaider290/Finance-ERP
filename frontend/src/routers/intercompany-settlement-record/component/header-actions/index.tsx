import { DataTableAction } from '@/components/DataTable/components/actions/data-table-action';
import { useAppDispatch } from '@/store';
import { setSelectedObj } from '@/store/slice/selectedObjSlice';
import INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS from '../../constants';
import { memo } from 'react';

export const IntercompanySettlementRecordCreateAction = memo(() => {
    const dispatch = useAppDispatch();
    return (
        <DataTableAction
            variant='default'
            size='default'
            label={`Create New ${INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_NAME}`}
            onClick={() => dispatch(setSelectedObj({
                objKey: INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY,
                mode: 'form',
                label: `Create New ${INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_NAME}`
            }))}
            permission={{
                module: INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.PERMISSIONS.MODULE,
                resource: INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.PERMISSIONS.RESOURCE,
                action: INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.PERMISSIONS.ACTIONS.CREATE,
            }} />
    )
})