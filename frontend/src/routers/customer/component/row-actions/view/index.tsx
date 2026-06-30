import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import CUSTOMER_CONSTANTS from '../../../constants';
import { getCustomerDetails } from '../../../service';
import { CustomerPrimaryKeys } from '../../../interface';
import { CustomerViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const CustomerView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, CUSTOMER_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: customerResponse, isLoading } = useQuery({
    queryKey: [CUSTOMER_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.customerId, primaryKeys],
    queryFn: () => getCustomerDetails(primaryKeys as Partial<CustomerPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = customerResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(CUSTOMER_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${CUSTOMER_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <CustomerViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

CustomerView.displayName = 'CustomerView';
export default CustomerView;
