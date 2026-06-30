import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getInvoiceDocumentEditDetails, updateInvoiceDocument } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { invoiceDocumentUpdateSchema } from '../../../validation';
import { InvoiceDocumentUpdate, InvoiceDocumentPrimaryKeys } from '../../../interface';
import InvoiceDocumentUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INVOICE_DOCUMENT_CONSTANTS from '../../../constants';


const InvoiceDocumentUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_DOCUMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(invoiceDocumentUpdateSchema), []);

  const form = useForm<InvoiceDocumentUpdate, unknown, InvoiceDocumentUpdate>({
  	resolver: zodResolver(invoiceDocumentUpdateSchema) as Resolver<InvoiceDocumentUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: invoiceDocumentResponse, isLoading: isLoadingInvoiceDocument } = useQuery({
    queryKey: [INVOICE_DOCUMENT_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.documentId, primaryKeys],
    queryFn: () => getInvoiceDocumentEditDetails(primaryKeys as Partial<InvoiceDocumentPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateInvoiceDocumentAsync } = useMutation({
    mutationFn: updateInvoiceDocument,
  });

  const isLoading = isLoadingInvoiceDocument;

  useEffect(() => {
    if (invoiceDocumentResponse?.data) {
    form.reset(invoiceDocumentResponse.data);
    }
  }, [invoiceDocumentResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(INVOICE_DOCUMENT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: InvoiceDocumentUpdate) => {
    try {
      await updateInvoiceDocumentAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [INVOICE_DOCUMENT_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateInvoiceDocumentAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${INVOICE_DOCUMENT_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Invoice Documents'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <InvoiceDocumentUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

InvoiceDocumentUpdateDrawer.displayName = 'InvoiceDocumentUpdateDrawer';

export default InvoiceDocumentUpdateDrawer;
