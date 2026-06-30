import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import PAYMENT_CONSTANTS from '../../../constants';
import { getPaymentDetails } from '../../../service';
import { PaymentPrimaryKeys } from '../../../interface';
import { PaymentViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const PaymentView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, PAYMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: paymentResponse, isLoading } = useQuery({
    queryKey: [PAYMENT_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.paymentId, primaryKeys],
    queryFn: () => getPaymentDetails(primaryKeys as Partial<PaymentPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = paymentResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(PAYMENT_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${PAYMENT_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <PaymentViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

PaymentView.displayName = 'PaymentView';
export default PaymentView;
