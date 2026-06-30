import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReimbursementDocument } from '../../../service';
import { ReimbursementDocumentCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import REIMBURSEMENT_DOCUMENT_CONSTANTS from '../../../constants';
import { reimbursementDocumentCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import ReimbursementDocumentForm from './create-form';
import defaultValues from '../../../data/reimbursementDocumentDefault'

const ReimbursementDocumentCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<ReimbursementDocumentCreate, unknown, ReimbursementDocumentCreate>({
    resolver: zodResolver(reimbursementDocumentCreateSchema) as Resolver<ReimbursementDocumentCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addReimbursementDocumentAsync, reset: resetAddReimbursementDocument, isPending, isSuccess, isError } = useMutation({
    mutationFn: addReimbursementDocument,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: ReimbursementDocumentCreate) => {
      try {
        await addReimbursementDocumentAsync(data);
        queryClient.invalidateQueries({ queryKey: [REIMBURSEMENT_DOCUMENT_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addReimbursementDocumentAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddReimbursementDocument();
      }
    };
  }, [isSuccess, isError, resetAddReimbursementDocument]);

  return (
    <ModalWrapper
      title={`Create ${REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Reimbursement Documents'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <ReimbursementDocumentForm />
      </FormProvider>
    </ModalWrapper>
  );
});


ReimbursementDocumentCreatePage.displayName = 'ReimbursementDocumentCreatePage';

export default ReimbursementDocumentCreatePage;
