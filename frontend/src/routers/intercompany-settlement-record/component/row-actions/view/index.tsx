import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS from '../../../constants';
import { getIntercompanySettlementRecordDetails } from '../../../service';
import { IntercompanySettlementRecordPrimaryKeys } from '../../../interface';
import { IntercompanySettlementRecordViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const IntercompanySettlementRecordView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: intercompanySettlementRecordResponse, isLoading } = useQuery({
    queryKey: [INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.settlementRecordId, primaryKeys],
    queryFn: () => getIntercompanySettlementRecordDetails(primaryKeys as Partial<IntercompanySettlementRecordPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = intercompanySettlementRecordResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <IntercompanySettlementRecordViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

IntercompanySettlementRecordView.displayName = 'IntercompanySettlementRecordView';
export default IntercompanySettlementRecordView;
