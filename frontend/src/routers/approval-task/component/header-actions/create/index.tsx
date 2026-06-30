import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addApprovalTask } from '../../../service';
import { ApprovalTaskCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import APPROVAL_TASK_CONSTANTS from '../../../constants';
import { approvalTaskCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import ApprovalTaskForm from './create-form';
import defaultValues from '../../../data/approvalTaskDefault'

const ApprovalTaskCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, APPROVAL_TASK_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<ApprovalTaskCreate, unknown, ApprovalTaskCreate>({
    resolver: zodResolver(approvalTaskCreateSchema) as Resolver<ApprovalTaskCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addApprovalTaskAsync, reset: resetAddApprovalTask, isPending, isSuccess, isError } = useMutation({
    mutationFn: addApprovalTask,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(APPROVAL_TASK_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: ApprovalTaskCreate) => {
      try {
        await addApprovalTaskAsync(data);
        queryClient.invalidateQueries({ queryKey: [APPROVAL_TASK_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addApprovalTaskAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddApprovalTask();
      }
    };
  }, [isSuccess, isError, resetAddApprovalTask]);

  return (
    <ModalWrapper
      title={`Create ${APPROVAL_TASK_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Approval Tasks'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <ApprovalTaskForm />
      </FormProvider>
    </ModalWrapper>
  );
});


ApprovalTaskCreatePage.displayName = 'ApprovalTaskCreatePage';

export default ApprovalTaskCreatePage;
