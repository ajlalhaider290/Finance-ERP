import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTaxCodeEditDetails, updateTaxCode } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { taxCodeUpdateSchema } from '../../../validation';
import { TaxCodeUpdate, TaxCodePrimaryKeys } from '../../../interface';
import TaxCodeUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import TAX_CODE_CONSTANTS from '../../../constants';


const TaxCodeUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TAX_CODE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(taxCodeUpdateSchema), []);

  const form = useForm<TaxCodeUpdate, unknown, TaxCodeUpdate>({
  	resolver: zodResolver(taxCodeUpdateSchema) as Resolver<TaxCodeUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: taxCodeResponse, isLoading: isLoadingTaxCode } = useQuery({
    queryKey: [TAX_CODE_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.taxCodeId, primaryKeys],
    queryFn: () => getTaxCodeEditDetails(primaryKeys as Partial<TaxCodePrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateTaxCodeAsync } = useMutation({
    mutationFn: updateTaxCode,
  });

  const isLoading = isLoadingTaxCode;

  useEffect(() => {
    if (taxCodeResponse?.data) {
    form.reset(taxCodeResponse.data);
    }
  }, [taxCodeResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(TAX_CODE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: TaxCodeUpdate) => {
    try {
      await updateTaxCodeAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [TAX_CODE_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateTaxCodeAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${TAX_CODE_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Tax Codes'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <TaxCodeUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

TaxCodeUpdateDrawer.displayName = 'TaxCodeUpdateDrawer';

export default TaxCodeUpdateDrawer;
