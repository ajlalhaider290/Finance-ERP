import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addIntercompanySettlementRecord } from '../../../service';
import { IntercompanySettlementRecordCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS from '../../../constants';
import { intercompanySettlementRecordCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import IntercompanySettlementRecordForm from './create-form';
import defaultValues from '../../../data/intercompanySettlementRecordDefault'

const IntercompanySettlementRecordCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<IntercompanySettlementRecordCreate, unknown, IntercompanySettlementRecordCreate>({
    resolver: zodResolver(intercompanySettlementRecordCreateSchema) as Resolver<IntercompanySettlementRecordCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addIntercompanySettlementRecordAsync, reset: resetAddIntercompanySettlementRecord, isPending, isSuccess, isError } = useMutation({
    mutationFn: addIntercompanySettlementRecord,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: IntercompanySettlementRecordCreate) => {
      try {
        await addIntercompanySettlementRecordAsync(data);
        queryClient.invalidateQueries({ queryKey: [INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addIntercompanySettlementRecordAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddIntercompanySettlementRecord();
      }
    };
  }, [isSuccess, isError, resetAddIntercompanySettlementRecord]);

  return (
    <ModalWrapper
      title={`Create ${INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Intercompany Settlement Records'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <IntercompanySettlementRecordForm />
      </FormProvider>
    </ModalWrapper>
  );
});


IntercompanySettlementRecordCreatePage.displayName = 'IntercompanySettlementRecordCreatePage';

export default IntercompanySettlementRecordCreatePage;
