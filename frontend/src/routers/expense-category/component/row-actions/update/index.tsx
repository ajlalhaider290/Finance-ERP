import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getExpenseCategoryEditDetails, updateExpenseCategory } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { expenseCategoryUpdateSchema } from '../../../validation';
import { ExpenseCategoryUpdate, ExpenseCategoryPrimaryKeys } from '../../../interface';
import ExpenseCategoryUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import EXPENSE_CATEGORY_CONSTANTS from '../../../constants';


const ExpenseCategoryUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(expenseCategoryUpdateSchema), []);

  const form = useForm<ExpenseCategoryUpdate, unknown, ExpenseCategoryUpdate>({
  	resolver: zodResolver(expenseCategoryUpdateSchema) as Resolver<ExpenseCategoryUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: expenseCategoryResponse, isLoading: isLoadingExpenseCategory } = useQuery({
    queryKey: [EXPENSE_CATEGORY_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.categoryId, primaryKeys],
    queryFn: () => getExpenseCategoryEditDetails(primaryKeys as Partial<ExpenseCategoryPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateExpenseCategoryAsync } = useMutation({
    mutationFn: updateExpenseCategory,
  });

  const isLoading = isLoadingExpenseCategory;

  useEffect(() => {
    if (expenseCategoryResponse?.data) {
    form.reset(expenseCategoryResponse.data);
    }
  }, [expenseCategoryResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: ExpenseCategoryUpdate) => {
    try {
      await updateExpenseCategoryAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [EXPENSE_CATEGORY_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateExpenseCategoryAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${EXPENSE_CATEGORY_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Expense Categories'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <ExpenseCategoryUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

ExpenseCategoryUpdateDrawer.displayName = 'ExpenseCategoryUpdateDrawer';

export default ExpenseCategoryUpdateDrawer;
