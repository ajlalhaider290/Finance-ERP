import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import INVOICE_DOCUMENT_CONSTANTS from '../../../constants';
import { getInvoiceDocumentDetails } from '../../../service';
import { InvoiceDocumentPrimaryKeys } from '../../../interface';
import { InvoiceDocumentViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const InvoiceDocumentView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_DOCUMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: invoiceDocumentResponse, isLoading } = useQuery({
    queryKey: [INVOICE_DOCUMENT_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.documentId, primaryKeys],
    queryFn: () => getInvoiceDocumentDetails(primaryKeys as Partial<InvoiceDocumentPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = invoiceDocumentResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(INVOICE_DOCUMENT_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${INVOICE_DOCUMENT_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <InvoiceDocumentViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

InvoiceDocumentView.displayName = 'InvoiceDocumentView';
export default InvoiceDocumentView;
