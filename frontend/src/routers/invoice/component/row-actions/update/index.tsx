import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getInvoiceEditDetails, updateInvoice } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { invoiceUpdateSchema } from '../../../validation';
import { InvoiceUpdate, InvoicePrimaryKeys } from '../../../interface';
import InvoiceUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INVOICE_CONSTANTS from '../../../constants';


const InvoiceUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(invoiceUpdateSchema), []);

  const form = useForm<InvoiceUpdate, unknown, InvoiceUpdate>({
  	resolver: zodResolver(invoiceUpdateSchema) as Resolver<InvoiceUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: invoiceResponse, isLoading: isLoadingInvoice } = useQuery({
    queryKey: [INVOICE_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.invoiceId, primaryKeys],
    queryFn: () => getInvoiceEditDetails(primaryKeys as Partial<InvoicePrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateInvoiceAsync } = useMutation({
    mutationFn: updateInvoice,
  });

  const isLoading = isLoadingInvoice;

  useEffect(() => {
    if (invoiceResponse?.data) {
    
      const formattedData = {
        ...invoiceResponse.data,
			invoiceDate: invoiceResponse.data.invoiceDate ? new Date(invoiceResponse.data.invoiceDate) : undefined,
			dueDate: invoiceResponse.data.dueDate ? new Date(invoiceResponse.data.dueDate) : undefined,

      };
      form.reset(formattedData);

    }
  }, [invoiceResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(INVOICE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: InvoiceUpdate) => {
    try {
      await updateInvoiceAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [INVOICE_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateInvoiceAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${INVOICE_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Invoices'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <InvoiceUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

InvoiceUpdateDrawer.displayName = 'InvoiceUpdateDrawer';

export default InvoiceUpdateDrawer;
