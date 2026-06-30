import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getApprovalTaskEditDetails, updateApprovalTask } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { approvalTaskUpdateSchema } from '../../../validation';
import { ApprovalTaskUpdate, ApprovalTaskPrimaryKeys } from '../../../interface';
import ApprovalTaskUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import APPROVAL_TASK_CONSTANTS from '../../../constants';


const ApprovalTaskUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, APPROVAL_TASK_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(approvalTaskUpdateSchema), []);

  const form = useForm<ApprovalTaskUpdate, unknown, ApprovalTaskUpdate>({
  	resolver: zodResolver(approvalTaskUpdateSchema) as Resolver<ApprovalTaskUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: approvalTaskResponse, isLoading: isLoadingApprovalTask } = useQuery({
    queryKey: [APPROVAL_TASK_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.taskId, primaryKeys],
    queryFn: () => getApprovalTaskEditDetails(primaryKeys as Partial<ApprovalTaskPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateApprovalTaskAsync } = useMutation({
    mutationFn: updateApprovalTask,
  });

  const isLoading = isLoadingApprovalTask;

  useEffect(() => {
    if (approvalTaskResponse?.data) {
    
      const formattedData = {
        ...approvalTaskResponse.data,
			actionedAt: approvalTaskResponse.data.actionedAt ? new Date(approvalTaskResponse.data.actionedAt) : null,

      };
      form.reset(formattedData);

    }
  }, [approvalTaskResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(APPROVAL_TASK_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: ApprovalTaskUpdate) => {
    try {
      await updateApprovalTaskAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [APPROVAL_TASK_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateApprovalTaskAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${APPROVAL_TASK_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Approval Tasks'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <ApprovalTaskUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

ApprovalTaskUpdateDrawer.displayName = 'ApprovalTaskUpdateDrawer';

export default ApprovalTaskUpdateDrawer;
