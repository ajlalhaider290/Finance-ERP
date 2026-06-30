import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import APPROVAL_TASK_CONSTANTS from '../../../constants';
import { getApprovalTaskDetails } from '../../../service';
import { ApprovalTaskPrimaryKeys } from '../../../interface';
import { ApprovalTaskViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const ApprovalTaskView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, APPROVAL_TASK_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: approvalTaskResponse, isLoading } = useQuery({
    queryKey: [APPROVAL_TASK_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.taskId, primaryKeys],
    queryFn: () => getApprovalTaskDetails(primaryKeys as Partial<ApprovalTaskPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = approvalTaskResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(APPROVAL_TASK_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${APPROVAL_TASK_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <ApprovalTaskViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

ApprovalTaskView.displayName = 'ApprovalTaskView';
export default ApprovalTaskView;
