import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCompanyEntity } from '../../../service';
import { CompanyEntityCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import COMPANY_ENTITY_CONSTANTS from '../../../constants';
import { companyEntityCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import CompanyEntityForm from './create-form';
import defaultValues from '../../../data/companyEntityDefault'

const CompanyEntityCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, COMPANY_ENTITY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<CompanyEntityCreate, unknown, CompanyEntityCreate>({
    resolver: zodResolver(companyEntityCreateSchema) as Resolver<CompanyEntityCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addCompanyEntityAsync, reset: resetAddCompanyEntity, isPending, isSuccess, isError } = useMutation({
    mutationFn: addCompanyEntity,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(COMPANY_ENTITY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: CompanyEntityCreate) => {
      try {
        await addCompanyEntityAsync(data);
        queryClient.invalidateQueries({ queryKey: [COMPANY_ENTITY_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addCompanyEntityAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddCompanyEntity();
      }
    };
  }, [isSuccess, isError, resetAddCompanyEntity]);

  return (
    <ModalWrapper
      title={`Create ${COMPANY_ENTITY_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Company Entities'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <CompanyEntityForm />
      </FormProvider>
    </ModalWrapper>
  );
});


CompanyEntityCreatePage.displayName = 'CompanyEntityCreatePage';

export default CompanyEntityCreatePage;
