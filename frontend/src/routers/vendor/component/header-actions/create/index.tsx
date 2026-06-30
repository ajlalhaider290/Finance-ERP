import { memo, useCallback, useEffect } from 'react';
	import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addVendor } from '../../../service';
import { VendorCreate } from '../../../interface';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import VENDOR_CONSTANTS from '../../../constants';
import { vendorCreateSchema } from '../../../validation';
import { ModalWrapper  } from '@/components/Wrapper';
import VendorForm from './create-form';
import defaultValues from '../../../data/vendorDefault'

const VendorCreatePage = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, VENDOR_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode } = selectedObj || {};
  const showForm = !!(isOpen && mode === 'form');

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const form = useForm<VendorCreate, unknown, VendorCreate>({
    resolver: zodResolver(vendorCreateSchema) as Resolver<VendorCreate>,
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: addVendorAsync, reset: resetAddVendor, isPending, isSuccess, isError } = useMutation({
    mutationFn: addVendor,
  });

  const handleClose = useCallback(() => {
    form.reset(defaultValues);
    dispatch(resetSelectedObj(VENDOR_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  const handleSubmit = useCallback(
    async (data: VendorCreate) => {
      try {
        await addVendorAsync(data);
        queryClient.invalidateQueries({ queryKey: [VENDOR_CONSTANTS.QUERY_KEY], exact: false });
        handleClose();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addVendorAsync, queryClient, form, handleClose],
  );

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [showForm, form]);

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        resetAddVendor();
      }
    };
  }, [isSuccess, isError, resetAddVendor]);

  return (
    <ModalWrapper
      title={`Create ${VENDOR_CONSTANTS.ENTITY_NAME}`}
      description={'Imported table Vendors'}
      open={showForm}
      onClose={handleClose}
      form={form}
      onSubmit={handleSubmit as (data: unknown) => Promise<void>}
      loading={isPending}
      
      width={600}
    >
      <FormProvider {...form}>
        <VendorForm />
      </FormProvider>
    </ModalWrapper>
  );
});


VendorCreatePage.displayName = 'VendorCreatePage';

export default VendorCreatePage;
