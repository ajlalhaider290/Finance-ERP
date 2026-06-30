import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCompanyEntityEditDetails, updateCompanyEntity } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { companyEntityUpdateSchema } from '../../../validation';
import { CompanyEntityUpdate, CompanyEntityPrimaryKeys } from '../../../interface';
import CompanyEntityUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import COMPANY_ENTITY_CONSTANTS from '../../../constants';


const CompanyEntityUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, COMPANY_ENTITY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(companyEntityUpdateSchema), []);

  const form = useForm<CompanyEntityUpdate, unknown, CompanyEntityUpdate>({
  	resolver: zodResolver(companyEntityUpdateSchema) as Resolver<CompanyEntityUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: companyEntityResponse, isLoading: isLoadingCompanyEntity } = useQuery({
    queryKey: [COMPANY_ENTITY_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.entityId, primaryKeys],
    queryFn: () => getCompanyEntityEditDetails(primaryKeys as Partial<CompanyEntityPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateCompanyEntityAsync } = useMutation({
    mutationFn: updateCompanyEntity,
  });

  const isLoading = isLoadingCompanyEntity;

  useEffect(() => {
    if (companyEntityResponse?.data) {
    form.reset(companyEntityResponse.data);
    }
  }, [companyEntityResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(COMPANY_ENTITY_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: CompanyEntityUpdate) => {
    try {
      await updateCompanyEntityAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [COMPANY_ENTITY_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateCompanyEntityAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${COMPANY_ENTITY_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Company Entities'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <CompanyEntityUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

CompanyEntityUpdateDrawer.displayName = 'CompanyEntityUpdateDrawer';

export default CompanyEntityUpdateDrawer;
