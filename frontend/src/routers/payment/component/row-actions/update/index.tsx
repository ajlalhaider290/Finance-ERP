import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPaymentEditDetails, updatePayment } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { paymentUpdateSchema } from '../../../validation';
import { PaymentUpdate, PaymentPrimaryKeys } from '../../../interface';
import PaymentUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import PAYMENT_CONSTANTS from '../../../constants';


const PaymentUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, PAYMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(paymentUpdateSchema), []);

  const form = useForm<PaymentUpdate, unknown, PaymentUpdate>({
  	resolver: zodResolver(paymentUpdateSchema) as Resolver<PaymentUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: paymentResponse, isLoading: isLoadingPayment } = useQuery({
    queryKey: [PAYMENT_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.paymentId, primaryKeys],
    queryFn: () => getPaymentEditDetails(primaryKeys as Partial<PaymentPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updatePaymentAsync } = useMutation({
    mutationFn: updatePayment,
  });

  const isLoading = isLoadingPayment;

  useEffect(() => {
    if (paymentResponse?.data) {
    
      const formattedData = {
        ...paymentResponse.data,
			paymentDate: paymentResponse.data.paymentDate ? new Date(paymentResponse.data.paymentDate) : undefined,

      };
      form.reset(formattedData);

    }
  }, [paymentResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(PAYMENT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: PaymentUpdate) => {
    try {
      await updatePaymentAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [PAYMENT_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updatePaymentAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${PAYMENT_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Payments'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <PaymentUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

PaymentUpdateDrawer.displayName = 'PaymentUpdateDrawer';

export default PaymentUpdateDrawer;
