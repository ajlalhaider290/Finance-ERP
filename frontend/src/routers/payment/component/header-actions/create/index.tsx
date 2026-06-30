import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPayment } from '../../../service';
import { PaymentCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import PAYMENT_CONSTANTS from '../../../constants';
import { paymentCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import PaymentForm from './create-form';
import defaultValues from '../../../data/paymentDefault'

const PaymentCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, PAYMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<PaymentCreate, unknown, PaymentCreate>({
    resolver: zodResolver(paymentCreateSchema) as Resolver<PaymentCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addPaymentAsync, reset: resetAddPayment, isPending, isSuccess, isError } = useMutation({
    mutationFn: addPayment,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(PAYMENT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: PaymentCreate) => {
      try {
        await addPaymentAsync(data);
        queryClient.invalidateQueries({ queryKey: [PAYMENT_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addPaymentAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddPayment();
      }
    };
  }, [isSuccess, isError, resetAddPayment]);

  return (
    <ModalWrapper
      title={`Create ${PAYMENT_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Payments'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <PaymentForm />
      </FormProvider>
    </ModalWrapper>
  );
});


PaymentCreatePage.displayName = 'PaymentCreatePage';

export default PaymentCreatePage;
