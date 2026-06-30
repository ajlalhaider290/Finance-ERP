import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getJournalEntryLineEditDetails, updateJournalEntryLine } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { journalEntryLineUpdateSchema } from '../../../validation';
import { JournalEntryLineUpdate, JournalEntryLinePrimaryKeys } from '../../../interface';
import JournalEntryLineUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import JOURNAL_ENTRY_LINE_CONSTANTS from '../../../constants';


const JournalEntryLineUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(journalEntryLineUpdateSchema), []);

  const form = useForm<JournalEntryLineUpdate, unknown, JournalEntryLineUpdate>({
  	resolver: zodResolver(journalEntryLineUpdateSchema) as Resolver<JournalEntryLineUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: journalEntryLineResponse, isLoading: isLoadingJournalEntryLine } = useQuery({
    queryKey: [JOURNAL_ENTRY_LINE_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.lineId, primaryKeys],
    queryFn: () => getJournalEntryLineEditDetails(primaryKeys as Partial<JournalEntryLinePrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateJournalEntryLineAsync } = useMutation({
    mutationFn: updateJournalEntryLine,
  });

  const isLoading = isLoadingJournalEntryLine;

  useEffect(() => {
    if (journalEntryLineResponse?.data) {
    form.reset(journalEntryLineResponse.data);
    }
  }, [journalEntryLineResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: JournalEntryLineUpdate) => {
    try {
      await updateJournalEntryLineAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [JOURNAL_ENTRY_LINE_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateJournalEntryLineAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Journal Entry Lines'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <JournalEntryLineUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

JournalEntryLineUpdateDrawer.displayName = 'JournalEntryLineUpdateDrawer';

export default JournalEntryLineUpdateDrawer;
