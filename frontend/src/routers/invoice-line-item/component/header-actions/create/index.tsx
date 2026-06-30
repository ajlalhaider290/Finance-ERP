import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addInvoiceLineItem } from '../../../service';
import { InvoiceLineItemCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INVOICE_LINE_ITEM_CONSTANTS from '../../../constants';
import { invoiceLineItemCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import InvoiceLineItemForm from './create-form';
import defaultValues from '../../../data/invoiceLineItemDefault'

const InvoiceLineItemCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_LINE_ITEM_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<InvoiceLineItemCreate, unknown, InvoiceLineItemCreate>({
    resolver: zodResolver(invoiceLineItemCreateSchema) as Resolver<InvoiceLineItemCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addInvoiceLineItemAsync, reset: resetAddInvoiceLineItem, isPending, isSuccess, isError } = useMutation({
    mutationFn: addInvoiceLineItem,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(INVOICE_LINE_ITEM_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: InvoiceLineItemCreate) => {
      try {
        await addInvoiceLineItemAsync(data);
        queryClient.invalidateQueries({ queryKey: [INVOICE_LINE_ITEM_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addInvoiceLineItemAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddInvoiceLineItem();
      }
    };
  }, [isSuccess, isError, resetAddInvoiceLineItem]);

  return (
    <ModalWrapper
      title={`Create ${INVOICE_LINE_ITEM_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Invoice Line Items'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <InvoiceLineItemForm />
      </FormProvider>
    </ModalWrapper>
  );
});


InvoiceLineItemCreatePage.displayName = 'InvoiceLineItemCreatePage';

export default InvoiceLineItemCreatePage;
