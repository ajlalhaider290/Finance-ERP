import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import INTERCOMPANY_TRANSACTION_CONSTANTS from '../../../constants';
import { getIntercompanyTransactionDetails } from '../../../service';
import { IntercompanyTransactionPrimaryKeys } from '../../../interface';
import { IntercompanyTransactionViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const IntercompanyTransactionView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: intercompanyTransactionResponse, isLoading } = useQuery({
    queryKey: [INTERCOMPANY_TRANSACTION_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.transactionId, primaryKeys],
    queryFn: () => getIntercompanyTransactionDetails(primaryKeys as Partial<IntercompanyTransactionPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = intercompanyTransactionResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <IntercompanyTransactionViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

IntercompanyTransactionView.displayName = 'IntercompanyTransactionView';
export default IntercompanyTransactionView;
