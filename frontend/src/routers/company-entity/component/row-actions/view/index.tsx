import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import COMPANY_ENTITY_CONSTANTS from '../../../constants';
import { getCompanyEntityDetails } from '../../../service';
import { CompanyEntityPrimaryKeys } from '../../../interface';
import { CompanyEntityViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const CompanyEntityView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, COMPANY_ENTITY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: companyEntityResponse, isLoading } = useQuery({
    queryKey: [COMPANY_ENTITY_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.entityId, primaryKeys],
    queryFn: () => getCompanyEntityDetails(primaryKeys as Partial<CompanyEntityPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = companyEntityResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(COMPANY_ENTITY_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${COMPANY_ENTITY_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <CompanyEntityViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

CompanyEntityView.displayName = 'CompanyEntityView';
export default CompanyEntityView;
