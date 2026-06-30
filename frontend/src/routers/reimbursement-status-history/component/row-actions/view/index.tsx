import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import REIMBURSEMENT_STATUS_HISTORY_CONSTANTS from '../../../constants';
import { getReimbursementStatusHistoryDetails } from '../../../service';
import { ReimbursementStatusHistoryPrimaryKeys } from '../../../interface';
import { ReimbursementStatusHistoryViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const ReimbursementStatusHistoryView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: reimbursementStatusHistoryResponse, isLoading } = useQuery({
    queryKey: [REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.statusHistoryId, primaryKeys],
    queryFn: () => getReimbursementStatusHistoryDetails(primaryKeys as Partial<ReimbursementStatusHistoryPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = reimbursementStatusHistoryResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <ReimbursementStatusHistoryViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

ReimbursementStatusHistoryView.displayName = 'ReimbursementStatusHistoryView';
export default ReimbursementStatusHistoryView;
