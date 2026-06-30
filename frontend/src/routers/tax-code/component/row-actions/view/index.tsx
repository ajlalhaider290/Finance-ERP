import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import TAX_CODE_CONSTANTS from '../../../constants';
import { getTaxCodeDetails } from '../../../service';
import { TaxCodePrimaryKeys } from '../../../interface';
import { TaxCodeViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const TaxCodeView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TAX_CODE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: taxCodeResponse, isLoading } = useQuery({
    queryKey: [TAX_CODE_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.taxCodeId, primaryKeys],
    queryFn: () => getTaxCodeDetails(primaryKeys as Partial<TaxCodePrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = taxCodeResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(TAX_CODE_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${TAX_CODE_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <TaxCodeViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

TaxCodeView.displayName = 'TaxCodeView';
export default TaxCodeView;
