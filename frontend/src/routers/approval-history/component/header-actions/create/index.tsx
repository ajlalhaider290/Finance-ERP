import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addApprovalHistory } from '../../../service';
import { ApprovalHistoryCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import APPROVAL_HISTORY_CONSTANTS from '../../../constants';
import { approvalHistoryCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import ApprovalHistoryForm from './create-form';
import defaultValues from '../../../data/approvalHistoryDefault'

const ApprovalHistoryCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<ApprovalHistoryCreate, unknown, ApprovalHistoryCreate>({
    resolver: zodResolver(approvalHistoryCreateSchema) as Resolver<ApprovalHistoryCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addApprovalHistoryAsync, reset: resetAddApprovalHistory, isPending, isSuccess, isError } = useMutation({
    mutationFn: addApprovalHistory,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: ApprovalHistoryCreate) => {
      try {
        await addApprovalHistoryAsync(data);
        queryClient.invalidateQueries({ queryKey: [APPROVAL_HISTORY_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addApprovalHistoryAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddApprovalHistory();
      }
    };
  }, [isSuccess, isError, resetAddApprovalHistory]);

  return (
    <ModalWrapper
      title={`Create ${APPROVAL_HISTORY_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Approval History'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <ApprovalHistoryForm />
      </FormProvider>
    </ModalWrapper>
  );
});


ApprovalHistoryCreatePage.displayName = 'ApprovalHistoryCreatePage';

export default ApprovalHistoryCreatePage;
