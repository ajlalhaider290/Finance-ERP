import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPaymentAllocationEditDetails, updatePaymentAllocation } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { paymentAllocationUpdateSchema } from '../../../validation';
import { PaymentAllocationUpdate, PaymentAllocationPrimaryKeys } from '../../../interface';
import PaymentAllocationUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import PAYMENT_ALLOCATION_CONSTANTS from '../../../constants';


const PaymentAllocationUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, PAYMENT_ALLOCATION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(paymentAllocationUpdateSchema), []);

  const form = useForm<PaymentAllocationUpdate, unknown, PaymentAllocationUpdate>({
  	resolver: zodResolver(paymentAllocationUpdateSchema) as Resolver<PaymentAllocationUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: paymentAllocationResponse, isLoading: isLoadingPaymentAllocation } = useQuery({
    queryKey: [PAYMENT_ALLOCATION_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.allocationId, primaryKeys],
    queryFn: () => getPaymentAllocationEditDetails(primaryKeys as Partial<PaymentAllocationPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updatePaymentAllocationAsync } = useMutation({
    mutationFn: updatePaymentAllocation,
  });

  const isLoading = isLoadingPaymentAllocation;

  useEffect(() => {
    if (paymentAllocationResponse?.data) {
    form.reset(paymentAllocationResponse.data);
    }
  }, [paymentAllocationResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(PAYMENT_ALLOCATION_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: PaymentAllocationUpdate) => {
    try {
      await updatePaymentAllocationAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [PAYMENT_ALLOCATION_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updatePaymentAllocationAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${PAYMENT_ALLOCATION_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Payment Allocations'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <PaymentAllocationUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

PaymentAllocationUpdateDrawer.displayName = 'PaymentAllocationUpdateDrawer';

export default PaymentAllocationUpdateDrawer;
