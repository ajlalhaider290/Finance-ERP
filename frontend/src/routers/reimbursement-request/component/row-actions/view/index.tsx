import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import REIMBURSEMENT_REQUEST_CONSTANTS from '../../../constants';
import { getReimbursementRequestDetails } from '../../../service';
import { ReimbursementRequestPrimaryKeys } from '../../../interface';
import { ReimbursementRequestViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const ReimbursementRequestView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_REQUEST_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: reimbursementRequestResponse, isLoading } = useQuery({
    queryKey: [REIMBURSEMENT_REQUEST_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.reimbursementRequestId, primaryKeys],
    queryFn: () => getReimbursementRequestDetails(primaryKeys as Partial<ReimbursementRequestPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = reimbursementRequestResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(REIMBURSEMENT_REQUEST_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${REIMBURSEMENT_REQUEST_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <ReimbursementRequestViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

ReimbursementRequestView.displayName = 'ReimbursementRequestView';
export default ReimbursementRequestView;
