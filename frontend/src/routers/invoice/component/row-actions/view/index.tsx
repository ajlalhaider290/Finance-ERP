import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import INVOICE_CONSTANTS from '../../../constants';
import { getInvoiceDetails } from '../../../service';
import { InvoicePrimaryKeys } from '../../../interface';
import { InvoiceViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const InvoiceView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: invoiceResponse, isLoading } = useQuery({
    queryKey: [INVOICE_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.invoiceId, primaryKeys],
    queryFn: () => getInvoiceDetails(primaryKeys as Partial<InvoicePrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = invoiceResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(INVOICE_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${INVOICE_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <InvoiceViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

InvoiceView.displayName = 'InvoiceView';
export default InvoiceView;
