import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addJournalEntryLine } from '../../../service';
import { JournalEntryLineCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import JOURNAL_ENTRY_LINE_CONSTANTS from '../../../constants';
import { journalEntryLineCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import JournalEntryLineForm from './create-form';
import defaultValues from '../../../data/journalEntryLineDefault'

const JournalEntryLineCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<JournalEntryLineCreate, unknown, JournalEntryLineCreate>({
    resolver: zodResolver(journalEntryLineCreateSchema) as Resolver<JournalEntryLineCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addJournalEntryLineAsync, reset: resetAddJournalEntryLine, isPending, isSuccess, isError } = useMutation({
    mutationFn: addJournalEntryLine,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: JournalEntryLineCreate) => {
      try {
        await addJournalEntryLineAsync(data);
        queryClient.invalidateQueries({ queryKey: [JOURNAL_ENTRY_LINE_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addJournalEntryLineAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddJournalEntryLine();
      }
    };
  }, [isSuccess, isError, resetAddJournalEntryLine]);

  return (
    <ModalWrapper
      title={`Create ${JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Journal Entry Lines'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <JournalEntryLineForm />
      </FormProvider>
    </ModalWrapper>
  );
});


JournalEntryLineCreatePage.displayName = 'JournalEntryLineCreatePage';

export default JournalEntryLineCreatePage;
