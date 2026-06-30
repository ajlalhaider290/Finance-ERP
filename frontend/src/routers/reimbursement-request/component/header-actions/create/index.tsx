import { memo, useCallback, useEffect, useMemo } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReimbursementRequest } from '../../../service';
import { ReimbursementRequestCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import REIMBURSEMENT_REQUEST_CONSTANTS from '../../../constants';
import { reimbursementRequestCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import ReimbursementRequestForm from './create-form';
import defaultValues from '../../../data/reimbursementRequestDefault'

const ReimbursementRequestCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_REQUEST_CONSTANTS.ENTITY_KEY));
  const { user } = useAppSelector((state: RootState) => state.session);
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const scopedDefaultValues = useMemo(
    () => ({
      ...defaultValues,
      employeeId: user?.userId || defaultValues.employeeId,
      entityId: user?.entityId || defaultValues.entityId,
      department: user?.department || defaultValues.department,
      status: user?.scope?.includes('user:employee') ? 'submitted' : defaultValues.status,
      paidDate: null,
    }),
    [user],
  );

  const form = useForm<ReimbursementRequestCreate, unknown, ReimbursementRequestCreate>({
    resolver: zodResolver(reimbursementRequestCreateSchema) as Resolver<ReimbursementRequestCreate>,
    defaultValues: scopedDefaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addReimbursementRequestAsync, reset: resetAddReimbursementRequest, isPending, isSuccess, isError } = useMutation({
    mutationFn: addReimbursementRequest,
  });

  const handleClose = useCallback(() => {
    form.reset(scopedDefaultValues);
    dispatch(resetSelectedObj(REIMBURSEMENT_REQUEST_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, scopedDefaultValues]);

  const handleSubmit = useCallback(
    async (data: ReimbursementRequestCreate) => {
      try {
        await addReimbursementRequestAsync(data);
        queryClient.invalidateQueries({ queryKey: [REIMBURSEMENT_REQUEST_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addReimbursementRequestAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(scopedDefaultValues);
    }
  }, [showForm, form, scopedDefaultValues]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddReimbursementRequest();
      }
    };
  }, [isSuccess, isError, resetAddReimbursementRequest]);

  return (
    <ModalWrapper
      title="Create Reimbursement Request"
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      submitText={user?.scope?.includes('user:employee') ? 'Submit Request' : 'Create'}
      width={600}
    >
      <FormProvider {...form}>
        <ReimbursementRequestForm />
      </FormProvider>
    </ModalWrapper>
  );
});


ReimbursementRequestCreatePage.displayName = 'ReimbursementRequestCreatePage';

export default ReimbursementRequestCreatePage;
