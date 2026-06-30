import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getVendorEditDetails, updateVendor } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { vendorUpdateSchema } from '../../../validation';
import { VendorUpdate, VendorPrimaryKeys } from '../../../interface';
import VendorUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import VENDOR_CONSTANTS from '../../../constants';


const VendorUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, VENDOR_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(vendorUpdateSchema), []);

  const form = useForm<VendorUpdate, unknown, VendorUpdate>({
  	resolver: zodResolver(vendorUpdateSchema) as Resolver<VendorUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: vendorResponse, isLoading: isLoadingVendor } = useQuery({
    queryKey: [VENDOR_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.vendorId, primaryKeys],
    queryFn: () => getVendorEditDetails(primaryKeys as Partial<VendorPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateVendorAsync } = useMutation({
    mutationFn: updateVendor,
  });

  const isLoading = isLoadingVendor;

  useEffect(() => {
    if (vendorResponse?.data) {
    form.reset(vendorResponse.data);
    }
  }, [vendorResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(VENDOR_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: VendorUpdate) => {
    try {
      await updateVendorAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [VENDOR_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateVendorAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${VENDOR_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Vendors'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <VendorUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

VendorUpdateDrawer.displayName = 'VendorUpdateDrawer';

export default VendorUpdateDrawer;
