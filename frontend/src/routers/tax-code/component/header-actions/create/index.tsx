import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTaxCode } from '../../../service';
import { TaxCodeCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import TAX_CODE_CONSTANTS from '../../../constants';
import { taxCodeCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import TaxCodeForm from './create-form';
import defaultValues from '../../../data/taxCodeDefault'

const TaxCodeCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, TAX_CODE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<TaxCodeCreate, unknown, TaxCodeCreate>({
    resolver: zodResolver(taxCodeCreateSchema) as Resolver<TaxCodeCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addTaxCodeAsync, reset: resetAddTaxCode, isPending, isSuccess, isError } = useMutation({
    mutationFn: addTaxCode,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(TAX_CODE_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: TaxCodeCreate) => {
      try {
        await addTaxCodeAsync(data);
        queryClient.invalidateQueries({ queryKey: [TAX_CODE_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addTaxCodeAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddTaxCode();
      }
    };
  }, [isSuccess, isError, resetAddTaxCode]);

  return (
    <ModalWrapper
      title={`Create ${TAX_CODE_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Tax Codes'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <TaxCodeForm />
      </FormProvider>
    </ModalWrapper>
  );
});


TaxCodeCreatePage.displayName = 'TaxCodeCreatePage';

export default TaxCodeCreatePage;
