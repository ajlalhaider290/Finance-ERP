import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getReimbursementDocumentEditDetails, updateReimbursementDocument } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { reimbursementDocumentUpdateSchema } from '../../../validation';
import { ReimbursementDocumentUpdate, ReimbursementDocumentPrimaryKeys } from '../../../interface';
import ReimbursementDocumentUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import REIMBURSEMENT_DOCUMENT_CONSTANTS from '../../../constants';


const ReimbursementDocumentUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(reimbursementDocumentUpdateSchema), []);

  const form = useForm<ReimbursementDocumentUpdate, unknown, ReimbursementDocumentUpdate>({
  	resolver: zodResolver(reimbursementDocumentUpdateSchema) as Resolver<ReimbursementDocumentUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: reimbursementDocumentResponse, isLoading: isLoadingReimbursementDocument } = useQuery({
    queryKey: [REIMBURSEMENT_DOCUMENT_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.documentId, primaryKeys],
    queryFn: () => getReimbursementDocumentEditDetails(primaryKeys as Partial<ReimbursementDocumentPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateReimbursementDocumentAsync } = useMutation({
    mutationFn: updateReimbursementDocument,
  });

  const isLoading = isLoadingReimbursementDocument;

  useEffect(() => {
    if (reimbursementDocumentResponse?.data) {
    form.reset(reimbursementDocumentResponse.data);
    }
  }, [reimbursementDocumentResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: ReimbursementDocumentUpdate) => {
    try {
      await updateReimbursementDocumentAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [REIMBURSEMENT_DOCUMENT_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateReimbursementDocumentAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Reimbursement Documents'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <ReimbursementDocumentUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

ReimbursementDocumentUpdateDrawer.displayName = 'ReimbursementDocumentUpdateDrawer';

export default ReimbursementDocumentUpdateDrawer;
