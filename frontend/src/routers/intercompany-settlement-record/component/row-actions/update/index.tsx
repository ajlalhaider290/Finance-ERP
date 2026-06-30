import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getIntercompanySettlementRecordEditDetails, updateIntercompanySettlementRecord } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { intercompanySettlementRecordUpdateSchema } from '../../../validation';
import { IntercompanySettlementRecordUpdate, IntercompanySettlementRecordPrimaryKeys } from '../../../interface';
import IntercompanySettlementRecordUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS from '../../../constants';


const IntercompanySettlementRecordUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(intercompanySettlementRecordUpdateSchema), []);

  const form = useForm<IntercompanySettlementRecordUpdate, unknown, IntercompanySettlementRecordUpdate>({
  	resolver: zodResolver(intercompanySettlementRecordUpdateSchema) as Resolver<IntercompanySettlementRecordUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: intercompanySettlementRecordResponse, isLoading: isLoadingIntercompanySettlementRecord } = useQuery({
    queryKey: [INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.settlementRecordId, primaryKeys],
    queryFn: () => getIntercompanySettlementRecordEditDetails(primaryKeys as Partial<IntercompanySettlementRecordPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateIntercompanySettlementRecordAsync } = useMutation({
    mutationFn: updateIntercompanySettlementRecord,
  });

  const isLoading = isLoadingIntercompanySettlementRecord;

  useEffect(() => {
    if (intercompanySettlementRecordResponse?.data) {
    
      const formattedData = {
        ...intercompanySettlementRecordResponse.data,
			settlementDate: intercompanySettlementRecordResponse.data.settlementDate ? new Date(intercompanySettlementRecordResponse.data.settlementDate) : undefined,

      };
      form.reset(formattedData);

    }
  }, [intercompanySettlementRecordResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: IntercompanySettlementRecordUpdate) => {
    try {
      await updateIntercompanySettlementRecordAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateIntercompanySettlementRecordAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Intercompany Settlement Records'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <IntercompanySettlementRecordUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

IntercompanySettlementRecordUpdateDrawer.displayName = 'IntercompanySettlementRecordUpdateDrawer';

export default IntercompanySettlementRecordUpdateDrawer;
