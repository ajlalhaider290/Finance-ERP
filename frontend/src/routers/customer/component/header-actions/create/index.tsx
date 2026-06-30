import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCustomer } from '../../../service';
import { CustomerCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import CUSTOMER_CONSTANTS from '../../../constants';
import { customerCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import CustomerForm from './create-form';
import defaultValues from '../../../data/customerDefault'

const CustomerCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, CUSTOMER_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<CustomerCreate, unknown, CustomerCreate>({
    resolver: zodResolver(customerCreateSchema) as Resolver<CustomerCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addCustomerAsync, reset: resetAddCustomer, isPending, isSuccess, isError } = useMutation({
    mutationFn: addCustomer,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(CUSTOMER_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: CustomerCreate) => {
      try {
        await addCustomerAsync(data);
        queryClient.invalidateQueries({ queryKey: [CUSTOMER_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addCustomerAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddCustomer();
      }
    };
  }, [isSuccess, isError, resetAddCustomer]);

  return (
    <ModalWrapper
      title={`Create ${CUSTOMER_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Customers'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <CustomerForm />
      </FormProvider>
    </ModalWrapper>
  );
});


CustomerCreatePage.displayName = 'CustomerCreatePage';

export default CustomerCreatePage;
