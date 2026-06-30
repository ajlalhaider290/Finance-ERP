import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import APPROVAL_HISTORY_CONSTANTS from '../../../constants';
import { getApprovalHistoryDetails } from '../../../service';
import { ApprovalHistoryPrimaryKeys } from '../../../interface';
import { ApprovalHistoryViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const ApprovalHistoryView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: approvalHistoryResponse, isLoading } = useQuery({
    queryKey: [APPROVAL_HISTORY_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.historyId, primaryKeys],
    queryFn: () => getApprovalHistoryDetails(primaryKeys as Partial<ApprovalHistoryPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = approvalHistoryResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${APPROVAL_HISTORY_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <ApprovalHistoryViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

ApprovalHistoryView.displayName = 'ApprovalHistoryView';
export default ApprovalHistoryView;
