import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addIntercompanyTransaction } from '../../../service';
import { IntercompanyTransactionCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INTERCOMPANY_TRANSACTION_CONSTANTS from '../../../constants';
import { intercompanyTransactionCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import IntercompanyTransactionForm from './create-form';
import defaultValues from '../../../data/intercompanyTransactionDefault'

const IntercompanyTransactionCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<IntercompanyTransactionCreate, unknown, IntercompanyTransactionCreate>({
    resolver: zodResolver(intercompanyTransactionCreateSchema) as Resolver<IntercompanyTransactionCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addIntercompanyTransactionAsync, reset: resetAddIntercompanyTransaction, isPending, isSuccess, isError } = useMutation({
    mutationFn: addIntercompanyTransaction,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: IntercompanyTransactionCreate) => {
      try {
        await addIntercompanyTransactionAsync(data);
        queryClient.invalidateQueries({ queryKey: [INTERCOMPANY_TRANSACTION_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addIntercompanyTransactionAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddIntercompanyTransaction();
      }
    };
  }, [isSuccess, isError, resetAddIntercompanyTransaction]);

  return (
    <ModalWrapper
      title={`Create ${INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Intercompany Transactions'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <IntercompanyTransactionForm />
      </FormProvider>
    </ModalWrapper>
  );
});


IntercompanyTransactionCreatePage.displayName = 'IntercompanyTransactionCreatePage';

export default IntercompanyTransactionCreatePage;
