import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCustomerEditDetails, updateCustomer } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { customerUpdateSchema } from '../../../validation';
import { CustomerUpdate, CustomerPrimaryKeys } from '../../../interface';
import CustomerUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import CUSTOMER_CONSTANTS from '../../../constants';


const CustomerUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, CUSTOMER_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(customerUpdateSchema), []);

  const form = useForm<CustomerUpdate, unknown, CustomerUpdate>({
  	resolver: zodResolver(customerUpdateSchema) as Resolver<CustomerUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: customerResponse, isLoading: isLoadingCustomer } = useQuery({
    queryKey: [CUSTOMER_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.customerId, primaryKeys],
    queryFn: () => getCustomerEditDetails(primaryKeys as Partial<CustomerPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateCustomerAsync } = useMutation({
    mutationFn: updateCustomer,
  });

  const isLoading = isLoadingCustomer;

  useEffect(() => {
    if (customerResponse?.data) {
    form.reset(customerResponse.data);
    }
  }, [customerResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(CUSTOMER_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: CustomerUpdate) => {
    try {
      await updateCustomerAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateCustomerAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${CUSTOMER_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Customers'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <CustomerUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

CustomerUpdateDrawer.displayName = 'CustomerUpdateDrawer';

export default CustomerUpdateDrawer;
