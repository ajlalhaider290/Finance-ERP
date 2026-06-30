import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getJournalEntryEditDetails, updateJournalEntry } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { journalEntryUpdateSchema } from '../../../validation';
import { JournalEntryUpdate, JournalEntryPrimaryKeys } from '../../../interface';
import JournalEntryUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import JOURNAL_ENTRY_CONSTANTS from '../../../constants';


const JournalEntryUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, JOURNAL_ENTRY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(journalEntryUpdateSchema), []);

  const form = useForm<JournalEntryUpdate, unknown, JournalEntryUpdate>({
  	resolver: zodResolver(journalEntryUpdateSchema) as Resolver<JournalEntryUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: journalEntryResponse, isLoading: isLoadingJournalEntry } = useQuery({
    queryKey: [JOURNAL_ENTRY_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.journalEntryId, primaryKeys],
    queryFn: () => getJournalEntryEditDetails(primaryKeys as Partial<JournalEntryPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateJournalEntryAsync } = useMutation({
    mutationFn: updateJournalEntry,
  });

  const isLoading = isLoadingJournalEntry;

  useEffect(() => {
    if (journalEntryResponse?.data) {
    
      const formattedData = {
        ...journalEntryResponse.data,
			entryDate: journalEntryResponse.data.entryDate ? new Date(journalEntryResponse.data.entryDate) : undefined,
			postedAt: journalEntryResponse.data.postedAt ? new Date(journalEntryResponse.data.postedAt) : null,

      };
      form.reset(formattedData);

    }
  }, [journalEntryResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(JOURNAL_ENTRY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: JournalEntryUpdate) => {
    try {
      await updateJournalEntryAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [JOURNAL_ENTRY_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateJournalEntryAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${JOURNAL_ENTRY_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Journal Entries'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <JournalEntryUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

JournalEntryUpdateDrawer.displayName = 'JournalEntryUpdateDrawer';

export default JournalEntryUpdateDrawer;
