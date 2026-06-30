import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getReimbursementRequestEditDetails, updateReimbursementRequest } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { reimbursementRequestUpdateSchema } from '../../../validation';
import { ReimbursementRequestUpdate, ReimbursementRequestPrimaryKeys } from '../../../interface';
import ReimbursementRequestUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import REIMBURSEMENT_REQUEST_CONSTANTS from '../../../constants';


const ReimbursementRequestUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_REQUEST_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(reimbursementRequestUpdateSchema), []);

  const form = useForm<ReimbursementRequestUpdate, unknown, ReimbursementRequestUpdate>({
  	resolver: zodResolver(reimbursementRequestUpdateSchema) as Resolver<ReimbursementRequestUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: reimbursementRequestResponse, isLoading: isLoadingReimbursementRequest } = useQuery({
    queryKey: [REIMBURSEMENT_REQUEST_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.reimbursementRequestId, primaryKeys],
    queryFn: () => getReimbursementRequestEditDetails(primaryKeys as Partial<ReimbursementRequestPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateReimbursementRequestAsync } = useMutation({
    mutationFn: updateReimbursementRequest,
  });

  const isLoading = isLoadingReimbursementRequest;

  useEffect(() => {
    if (reimbursementRequestResponse?.data) {
    
      const formattedData = {
        ...reimbursementRequestResponse.data,
			expenseDate: reimbursementRequestResponse.data.expenseDate ? new Date(reimbursementRequestResponse.data.expenseDate) : undefined,
			paidDate: reimbursementRequestResponse.data.paidDate ? new Date(reimbursementRequestResponse.data.paidDate) : null,

      };
      form.reset(formattedData);

    }
  }, [reimbursementRequestResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(REIMBURSEMENT_REQUEST_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: ReimbursementRequestUpdate) => {
    try {
      await updateReimbursementRequestAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [REIMBURSEMENT_REQUEST_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateReimbursementRequestAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title="Edit Reimbursement Request"
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      submitText="Save"
      
    >
      <FormProvider {...form}>
        <ReimbursementRequestUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

ReimbursementRequestUpdateDrawer.displayName = 'ReimbursementRequestUpdateDrawer';

export default ReimbursementRequestUpdateDrawer;
