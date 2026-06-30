import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import VENDOR_CONSTANTS from '../../../constants';
import { getVendorDetails } from '../../../service';
import { VendorPrimaryKeys } from '../../../interface';
import { VendorViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const VendorView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, VENDOR_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: vendorResponse, isLoading } = useQuery({
    queryKey: [VENDOR_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.vendorId, primaryKeys],
    queryFn: () => getVendorDetails(primaryKeys as Partial<VendorPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = vendorResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(VENDOR_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${VENDOR_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <VendorViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

VendorView.displayName = 'VendorView';
export default VendorView;
