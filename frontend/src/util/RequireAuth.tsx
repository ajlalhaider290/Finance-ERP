import { useEffect, useMemo } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setLogout } from '@/store/slice/sessionSlice';
import { getJwtExpirationTime, isJwtExpired } from '@/util/token';

const RequireAuth = (/* allowedRoles:string[] */) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, token, refreshToken } = useAppSelector((store: RootState) => store.session);
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}`;
  const loginPath = `/userLogin?redirect=${encodeURIComponent(currentPath)}`;
  const sessionExpired = isLoggedIn && (isJwtExpired(refreshToken) || (!refreshToken && isJwtExpired(token)));

  const sessionExpiresAt = useMemo(() => {
    return getJwtExpirationTime(refreshToken) ?? getJwtExpirationTime(token);
  }, [refreshToken, token]);

  useEffect(() => {
    if (!isLoggedIn || !sessionExpiresAt) {
      return;
    }

    const timeUntilExpiry = sessionExpiresAt - Date.now();
    if (timeUntilExpiry <= 0) {
      dispatch(setLogout());
      window.location.replace(loginPath);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(setLogout());
      window.location.replace(loginPath);
    }, Math.min(timeUntilExpiry, 2147483647));

    return () => window.clearTimeout(timeoutId);
  }, [dispatch, isLoggedIn, loginPath, sessionExpiresAt]);

  useEffect(() => {
    if (sessionExpired) {
      dispatch(setLogout());
    }
  }, [dispatch, sessionExpired]);

  return isLoggedIn && !sessionExpired ? <Outlet /> : <Navigate to={loginPath} state={{ from: location }} replace />;

  // return (
  //     auth?.roles?.find(role => allowedRoles?.includes(role))
  //         ? <Outlet />
  //         : auth?.user
  //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
  //             : <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default RequireAuth;
