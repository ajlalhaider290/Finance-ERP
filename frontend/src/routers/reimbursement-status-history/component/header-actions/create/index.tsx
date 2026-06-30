import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReimbursementStatusHistory } from '../../../service';
import { ReimbursementStatusHistoryCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import REIMBURSEMENT_STATUS_HISTORY_CONSTANTS from '../../../constants';
import { reimbursementStatusHistoryCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import ReimbursementStatusHistoryForm from './create-form';
import defaultValues from '../../../data/reimbursementStatusHistoryDefault'

const ReimbursementStatusHistoryCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<ReimbursementStatusHistoryCreate, unknown, ReimbursementStatusHistoryCreate>({
    resolver: zodResolver(reimbursementStatusHistoryCreateSchema) as Resolver<ReimbursementStatusHistoryCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addReimbursementStatusHistoryAsync, reset: resetAddReimbursementStatusHistory, isPending, isSuccess, isError } = useMutation({
    mutationFn: addReimbursementStatusHistory,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: ReimbursementStatusHistoryCreate) => {
      try {
        await addReimbursementStatusHistoryAsync(data);
        queryClient.invalidateQueries({ queryKey: [REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addReimbursementStatusHistoryAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddReimbursementStatusHistory();
      }
    };
  }, [isSuccess, isError, resetAddReimbursementStatusHistory]);

  return (
    <ModalWrapper
      title={`Create ${REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Reimbursement Status History'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <ReimbursementStatusHistoryForm />
      </FormProvider>
    </ModalWrapper>
  );
});


ReimbursementStatusHistoryCreatePage.displayName = 'ReimbursementStatusHistoryCreatePage';

export default ReimbursementStatusHistoryCreatePage;
