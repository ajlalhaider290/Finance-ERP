import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPaymentAllocation } from '../../../service';
import { PaymentAllocationCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import PAYMENT_ALLOCATION_CONSTANTS from '../../../constants';
import { paymentAllocationCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import PaymentAllocationForm from './create-form';
import defaultValues from '../../../data/paymentAllocationDefault'

const PaymentAllocationCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, PAYMENT_ALLOCATION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<PaymentAllocationCreate, unknown, PaymentAllocationCreate>({
    resolver: zodResolver(paymentAllocationCreateSchema) as Resolver<PaymentAllocationCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addPaymentAllocationAsync, reset: resetAddPaymentAllocation, isPending, isSuccess, isError } = useMutation({
    mutationFn: addPaymentAllocation,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(PAYMENT_ALLOCATION_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: PaymentAllocationCreate) => {
      try {
        await addPaymentAllocationAsync(data);
        queryClient.invalidateQueries({ queryKey: [PAYMENT_ALLOCATION_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addPaymentAllocationAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddPaymentAllocation();
      }
    };
  }, [isSuccess, isError, resetAddPaymentAllocation]);

  return (
    <ModalWrapper
      title={`Create ${PAYMENT_ALLOCATION_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Payment Allocations'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <PaymentAllocationForm />
      </FormProvider>
    </ModalWrapper>
  );
});


PaymentAllocationCreatePage.displayName = 'PaymentAllocationCreatePage';

export default PaymentAllocationCreatePage;
