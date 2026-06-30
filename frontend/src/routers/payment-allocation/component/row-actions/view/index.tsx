import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import PAYMENT_ALLOCATION_CONSTANTS from '../../../constants';
import { getPaymentAllocationDetails } from '../../../service';
import { PaymentAllocationPrimaryKeys } from '../../../interface';
import { PaymentAllocationViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const PaymentAllocationView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, PAYMENT_ALLOCATION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: paymentAllocationResponse, isLoading } = useQuery({
    queryKey: [PAYMENT_ALLOCATION_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.allocationId, primaryKeys],
    queryFn: () => getPaymentAllocationDetails(primaryKeys as Partial<PaymentAllocationPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = paymentAllocationResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(PAYMENT_ALLOCATION_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${PAYMENT_ALLOCATION_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <PaymentAllocationViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

PaymentAllocationView.displayName = 'PaymentAllocationView';
export default PaymentAllocationView;
