import { memo, useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUserEditDetails, updateUser } from '../../../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { userUpdateSchema } from '../../../validation';
import { UserUpdate, UserPrimaryKeys } from '../../../interface';
import UserUpdateForm from './update-form';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { ModalWrapper  } from '@/components/Wrapper';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import USER_CONSTANTS from '../../../constants';


const UserUpdateDrawer = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, USER_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showEdit = !!(isOpen && mode === 'edit');

  const dispatch = useAppDispatch();

  const defaultValues = useMemo(() => getDefaultFormValues(userUpdateSchema), []);

  const form = useForm<UserUpdate, unknown, UserUpdate>({
  	resolver: zodResolver(userUpdateSchema) as Resolver<UserUpdate>,
  	defaultValues: defaultValues,
  	mode: 'onChange',
	});

  const queryClient = useQueryClient();
  const { data: userResponse, isLoading: isLoadingUser } = useQuery({
    queryKey: [USER_CONSTANTS.QUERY_KEY, 'edit', primaryKeys?.userId, primaryKeys],
    queryFn: () => getUserEditDetails(primaryKeys as Partial<UserPrimaryKeys>),
    enabled: Boolean(showEdit && Object.keys(primaryKeys || {}).length > 0),
	staleTime: 30000, // 30 seconds
  });


  const { mutateAsync: updateUserAsync } = useMutation({
    mutationFn: updateUser,
  });

  const isLoading = isLoadingUser;

  useEffect(() => {
    if (userResponse?.data) {
    form.reset(userResponse.data);
    }
  }, [userResponse, form]);

const handleClose = useCallback(() => {
  form.reset(defaultValues);
  dispatch(resetSelectedObj(USER_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch, defaultValues]);

  const updateData = useCallback(
  async (data: UserUpdate) => {
    try {
      await updateUserAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [USER_CONSTANTS.QUERY_KEY], exact: false });
      handleClose();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateUserAsync, primaryKeys, queryClient, form, handleClose],
);

  return (
    <ModalWrapper
      title={`Edit ${USER_CONSTANTS.ENTITY_NAME}`}
        description={'Imported table Users'}
      open={showEdit}
      onClose={handleClose}
      form={form}
      onSubmit={updateData as (data: unknown) => void}
      width={600}
      loading={isLoading}
      
    >
      <FormProvider {...form}>
        <UserUpdateForm  />
      </FormProvider>
    </ModalWrapper>
  );
});

UserUpdateDrawer.displayName = 'UserUpdateDrawer';

export default UserUpdateDrawer;
