import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addInvoice } from '../../../service';
import { InvoiceCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INVOICE_CONSTANTS from '../../../constants';
import { invoiceCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import InvoiceForm from './create-form';
import defaultValues from '../../../data/invoiceDefault'

const InvoiceCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<InvoiceCreate, unknown, InvoiceCreate>({
    resolver: zodResolver(invoiceCreateSchema) as Resolver<InvoiceCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addInvoiceAsync, reset: resetAddInvoice, isPending, isSuccess, isError } = useMutation({
    mutationFn: addInvoice,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(INVOICE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: InvoiceCreate) => {
      try {
        await addInvoiceAsync(data);
        queryClient.invalidateQueries({ queryKey: [INVOICE_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addInvoiceAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddInvoice();
      }
    };
  }, [isSuccess, isError, resetAddInvoice]);

  return (
    <ModalWrapper
      title={`Create ${INVOICE_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Invoices'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <InvoiceForm />
      </FormProvider>
    </ModalWrapper>
  );
});


InvoiceCreatePage.displayName = 'InvoiceCreatePage';

export default InvoiceCreatePage;
