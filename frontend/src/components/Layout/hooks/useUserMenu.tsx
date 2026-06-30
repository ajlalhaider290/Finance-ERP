import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store';
import { setLogout } from '@/store/slice/sessionSlice';

interface UseUserMenuProps {
  logoutRedirect?: string;
}

export const useUserMenu = ({ logoutRedirect }: UseUserMenuProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.session);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(setLogout());
    if (logoutRedirect) {
      navigate(logoutRedirect);
    }
  }, [dispatch, navigate, logoutRedirect]);

  const handleMenuClick = useCallback(
    (path: string) => {
      if (isLoggedIn) {
        navigate(path);
      } else if (logoutRedirect) {
        navigate(logoutRedirect);
      } else {
        navigate('/');
      }
    },
    [navigate, isLoggedIn, logoutRedirect],
  );

  return {
    handleLogout,
    handleMenuClick,
  };
};
