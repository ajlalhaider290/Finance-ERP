import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getInvoiceLineItemEditDetails, updateInvoiceLineItem } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { invoiceLineItemUpdateSchema } from '../../../validation';
import { InvoiceLineItemUpdate, InvoiceLineItemPrimaryKeys } from '../../../interface';
import InvoiceLineItemUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INVOICE_LINE_ITEM_CONSTANTS from '../../../constants';


const InvoiceLineItemUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INVOICE_LINE_ITEM_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(invoiceLineItemUpdateSchema), []);

  const form = useForm<InvoiceLineItemUpdate, unknown, InvoiceLineItemUpdate>({
  	resolver: zodResolver(invoiceLineItemUpdateSchema) as Resolver<InvoiceLineItemUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: invoiceLineItemResponse, isLoading: isLoadingInvoiceLineItem } = useQuery({
    queryKey: [INVOICE_LINE_ITEM_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.lineItemId, primaryKeys],
    queryFn: () => getInvoiceLineItemEditDetails(primaryKeys as Partial<InvoiceLineItemPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateInvoiceLineItemAsync } = useMutation({
    mutationFn: updateInvoiceLineItem,
  });

  const isLoading = isLoadingInvoiceLineItem;

  useEffect(() => {
    if (invoiceLineItemResponse?.data) {
    form.reset(invoiceLineItemResponse.data);
    }
  }, [invoiceLineItemResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(INVOICE_LINE_ITEM_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: InvoiceLineItemUpdate) => {
    try {
      await updateInvoiceLineItemAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [INVOICE_LINE_ITEM_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateInvoiceLineItemAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${INVOICE_LINE_ITEM_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Invoice Line Items'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <InvoiceLineItemUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

InvoiceLineItemUpdateDrawer.displayName = 'InvoiceLineItemUpdateDrawer';

export default InvoiceLineItemUpdateDrawer;
