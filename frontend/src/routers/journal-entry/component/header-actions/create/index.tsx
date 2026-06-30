import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addJournalEntry } from '../../../service';
import { JournalEntryCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import JOURNAL_ENTRY_CONSTANTS from '../../../constants';
import { journalEntryCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import JournalEntryForm from './create-form';
import defaultValues from '../../../data/journalEntryDefault'

const JournalEntryCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, JOURNAL_ENTRY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<JournalEntryCreate, unknown, JournalEntryCreate>({
    resolver: zodResolver(journalEntryCreateSchema) as Resolver<JournalEntryCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addJournalEntryAsync, reset: resetAddJournalEntry, isPending, isSuccess, isError } = useMutation({
    mutationFn: addJournalEntry,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(JOURNAL_ENTRY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: JournalEntryCreate) => {
      try {
        await addJournalEntryAsync(data);
        queryClient.invalidateQueries({ queryKey: [JOURNAL_ENTRY_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addJournalEntryAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddJournalEntry();
      }
    };
  }, [isSuccess, isError, resetAddJournalEntry]);

  return (
    <ModalWrapper
      title={`Create ${JOURNAL_ENTRY_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Journal Entries'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <JournalEntryForm />
      </FormProvider>
    </ModalWrapper>
  );
});


JournalEntryCreatePage.displayName = 'JournalEntryCreatePage';

export default JournalEntryCreatePage;
