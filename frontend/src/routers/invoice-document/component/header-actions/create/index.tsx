import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addInvoiceDocument } from '../../../service';
import { InvoiceDocumentCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INVOICE_DOCUMENT_CONSTANTS from '../../../constants';
import { invoiceDocumentCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import InvoiceDocumentForm from './create-form';
import defaultValues from '../../../data/invoiceDocumentDefault'

const InvoiceDocumentCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_DOCUMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<InvoiceDocumentCreate, unknown, InvoiceDocumentCreate>({
    resolver: zodResolver(invoiceDocumentCreateSchema) as Resolver<InvoiceDocumentCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addInvoiceDocumentAsync, reset: resetAddInvoiceDocument, isPending, isSuccess, isError } = useMutation({
    mutationFn: addInvoiceDocument,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(INVOICE_DOCUMENT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: InvoiceDocumentCreate) => {
      try {
        await addInvoiceDocumentAsync(data);
        queryClient.invalidateQueries({ queryKey: [INVOICE_DOCUMENT_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addInvoiceDocumentAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddInvoiceDocument();
      }
    };
  }, [isSuccess, isError, resetAddInvoiceDocument]);

  return (
    <ModalWrapper
      title={`Create ${INVOICE_DOCUMENT_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Invoice Documents'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <InvoiceDocumentForm />
      </FormProvider>
    </ModalWrapper>
  );
});


InvoiceDocumentCreatePage.displayName = 'InvoiceDocumentCreatePage';

export default InvoiceDocumentCreatePage;
