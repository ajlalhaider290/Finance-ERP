import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExpenseCategory } from '../../../service';
import { ExpenseCategoryCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import EXPENSE_CATEGORY_CONSTANTS from '../../../constants';
import { expenseCategoryCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import ExpenseCategoryForm from './create-form';
import defaultValues from '../../../data/expenseCategoryDefault'

const ExpenseCategoryCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<ExpenseCategoryCreate, unknown, ExpenseCategoryCreate>({
    resolver: zodResolver(expenseCategoryCreateSchema) as Resolver<ExpenseCategoryCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addExpenseCategoryAsync, reset: resetAddExpenseCategory, isPending, isSuccess, isError } = useMutation({
    mutationFn: addExpenseCategory,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(EXPENSE_CATEGORY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: ExpenseCategoryCreate) => {
      try {
        await addExpenseCategoryAsync(data);
        queryClient.invalidateQueries({ queryKey: [EXPENSE_CATEGORY_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addExpenseCategoryAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddExpenseCategory();
      }
    };
  }, [isSuccess, isError, resetAddExpenseCategory]);

  return (
    <ModalWrapper
      title={`Create ${EXPENSE_CATEGORY_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Expense Categories'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <ExpenseCategoryForm />
      </FormProvider>
    </ModalWrapper>
  );
});


ExpenseCategoryCreatePage.displayName = 'ExpenseCategoryCreatePage';

export default ExpenseCategoryCreatePage;
