import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getApprovalHistoryEditDetails, updateApprovalHistory } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { approvalHistoryUpdateSchema } from '../../../validation';
import { ApprovalHistoryUpdate, ApprovalHistoryPrimaryKeys } from '../../../interface';
import ApprovalHistoryUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import APPROVAL_HISTORY_CONSTANTS from '../../../constants';


const ApprovalHistoryUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(approvalHistoryUpdateSchema), []);

  const form = useForm<ApprovalHistoryUpdate, unknown, ApprovalHistoryUpdate>({
  	resolver: zodResolver(approvalHistoryUpdateSchema) as Resolver<ApprovalHistoryUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: approvalHistoryResponse, isLoading: isLoadingApprovalHistory } = useQuery({
    queryKey: [APPROVAL_HISTORY_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.historyId, primaryKeys],
    queryFn: () => getApprovalHistoryEditDetails(primaryKeys as Partial<ApprovalHistoryPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateApprovalHistoryAsync } = useMutation({
    mutationFn: updateApprovalHistory,
  });

  const isLoading = isLoadingApprovalHistory;

  useEffect(() => {
    if (approvalHistoryResponse?.data) {
    form.reset(approvalHistoryResponse.data);
    }
  }, [approvalHistoryResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: ApprovalHistoryUpdate) => {
    try {
      await updateApprovalHistoryAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [APPROVAL_HISTORY_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateApprovalHistoryAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${APPROVAL_HISTORY_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Approval History'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <ApprovalHistoryUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

ApprovalHistoryUpdateDrawer.displayName = 'ApprovalHistoryUpdateDrawer';

export default ApprovalHistoryUpdateDrawer;
