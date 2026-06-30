import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import INVOICE_LINE_ITEM_CONSTANTS from '../../../constants';
import { getInvoiceLineItemDetails } from '../../../service';
import { InvoiceLineItemPrimaryKeys } from '../../../interface';
import { InvoiceLineItemViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const InvoiceLineItemView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_LINE_ITEM_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: invoiceLineItemResponse, isLoading } = useQuery({
    queryKey: [INVOICE_LINE_ITEM_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.lineItemId, primaryKeys],
    queryFn: () => getInvoiceLineItemDetails(primaryKeys as Partial<InvoiceLineItemPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = invoiceLineItemResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(INVOICE_LINE_ITEM_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${INVOICE_LINE_ITEM_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <InvoiceLineItemViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

InvoiceLineItemView.displayName = 'InvoiceLineItemView';
export default InvoiceLineItemView;
