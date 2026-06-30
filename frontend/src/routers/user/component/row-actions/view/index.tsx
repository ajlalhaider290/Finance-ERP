import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import USER_CONSTANTS from '../../../constants';
import { getUserDetails } from '../../../service';
import { UserPrimaryKeys } from '../../../interface';
import { UserViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const UserView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, USER_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: userResponse, isLoading } = useQuery({
    queryKey: [USER_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.userId, primaryKeys],
    queryFn: () => getUserDetails(primaryKeys as Partial<UserPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = userResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(USER_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${USER_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <UserViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

UserView.displayName = 'UserView';
export default UserView;
