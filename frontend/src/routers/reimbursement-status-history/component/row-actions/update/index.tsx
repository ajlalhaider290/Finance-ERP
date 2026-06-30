import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getReimbursementStatusHistoryEditDetails, updateReimbursementStatusHistory } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { reimbursementStatusHistoryUpdateSchema } from '../../../validation';
import { ReimbursementStatusHistoryUpdate, ReimbursementStatusHistoryPrimaryKeys } from '../../../interface';
import ReimbursementStatusHistoryUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import REIMBURSEMENT_STATUS_HISTORY_CONSTANTS from '../../../constants';


const ReimbursementStatusHistoryUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(reimbursementStatusHistoryUpdateSchema), []);

  const form = useForm<ReimbursementStatusHistoryUpdate, unknown, ReimbursementStatusHistoryUpdate>({
  	resolver: zodResolver(reimbursementStatusHistoryUpdateSchema) as Resolver<ReimbursementStatusHistoryUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: reimbursementStatusHistoryResponse, isLoading: isLoadingReimbursementStatusHistory } = useQuery({
    queryKey: [REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.statusHistoryId, primaryKeys],
    queryFn: () => getReimbursementStatusHistoryEditDetails(primaryKeys as Partial<ReimbursementStatusHistoryPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateReimbursementStatusHistoryAsync } = useMutation({
    mutationFn: updateReimbursementStatusHistory,
  });

  const isLoading = isLoadingReimbursementStatusHistory;

  useEffect(() => {
    if (reimbursementStatusHistoryResponse?.data) {
    form.reset(reimbursementStatusHistoryResponse.data);
    }
  }, [reimbursementStatusHistoryResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: ReimbursementStatusHistoryUpdate) => {
    try {
      await updateReimbursementStatusHistoryAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateReimbursementStatusHistoryAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Reimbursement Status History'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <ReimbursementStatusHistoryUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

ReimbursementStatusHistoryUpdateDrawer.displayName = 'ReimbursementStatusHistoryUpdateDrawer';

export default ReimbursementStatusHistoryUpdateDrawer;
