import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import EXPENSE_CATEGORY_CONSTANTS from '../../../constants';
import { getExpenseCategoryDetails } from '../../../service';
import { ExpenseCategoryPrimaryKeys } from '../../../interface';
import { ExpenseCategoryViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const ExpenseCategoryView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: expenseCategoryResponse, isLoading } = useQuery({
    queryKey: [EXPENSE_CATEGORY_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.categoryId, primaryKeys],
    queryFn: () => getExpenseCategoryDetails(primaryKeys as Partial<ExpenseCategoryPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = expenseCategoryResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${EXPENSE_CATEGORY_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <ExpenseCategoryViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

ExpenseCategoryView.displayName = 'ExpenseCategoryView';
export default ExpenseCategoryView;
