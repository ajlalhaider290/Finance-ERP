import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getIntercompanyTransactionEditDetails, updateIntercompanyTransaction } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { intercompanyTransactionUpdateSchema } from '../../../validation';
import { IntercompanyTransactionUpdate, IntercompanyTransactionPrimaryKeys } from '../../../interface';
import IntercompanyTransactionUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import INTERCOMPANY_TRANSACTION_CONSTANTS from '../../../constants';


const IntercompanyTransactionUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(intercompanyTransactionUpdateSchema), []);

  const form = useForm<IntercompanyTransactionUpdate, unknown, IntercompanyTransactionUpdate>({
  	resolver: zodResolver(intercompanyTransactionUpdateSchema) as Resolver<IntercompanyTransactionUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: intercompanyTransactionResponse, isLoading: isLoadingIntercompanyTransaction } = useQuery({
    queryKey: [INTERCOMPANY_TRANSACTION_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.transactionId, primaryKeys],
    queryFn: () => getIntercompanyTransactionEditDetails(primaryKeys as Partial<IntercompanyTransactionPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateIntercompanyTransactionAsync } = useMutation({
    mutationFn: updateIntercompanyTransaction,
  });

  const isLoading = isLoadingIntercompanyTransaction;

  useEffect(() => {
    if (intercompanyTransactionResponse?.data) {
    
      const formattedData = {
        ...intercompanyTransactionResponse.data,
			transactionDate: intercompanyTransactionResponse.data.transactionDate ? new Date(intercompanyTransactionResponse.data.transactionDate) : undefined,

      };
      form.reset(formattedData);

    }
  }, [intercompanyTransactionResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: IntercompanyTransactionUpdate) => {
    try {
      await updateIntercompanyTransactionAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [INTERCOMPANY_TRANSACTION_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateIntercompanyTransactionAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Intercompany Transactions'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <IntercompanyTransactionUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

IntercompanyTransactionUpdateDrawer.displayName = 'IntercompanyTransactionUpdateDrawer';

export default IntercompanyTransactionUpdateDrawer;
