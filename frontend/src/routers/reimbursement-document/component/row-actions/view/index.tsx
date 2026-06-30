import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import REIMBURSEMENT_DOCUMENT_CONSTANTS from '../../../constants';
import { getReimbursementDocumentDetails } from '../../../service';
import { ReimbursementDocumentPrimaryKeys } from '../../../interface';
import { ReimbursementDocumentViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const ReimbursementDocumentView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: reimbursementDocumentResponse, isLoading } = useQuery({
    queryKey: [REIMBURSEMENT_DOCUMENT_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.documentId, primaryKeys],
    queryFn: () => getReimbursementDocumentDetails(primaryKeys as Partial<ReimbursementDocumentPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = reimbursementDocumentResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <ReimbursementDocumentViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

ReimbursementDocumentView.displayName = 'ReimbursementDocumentView';
export default ReimbursementDocumentView;
