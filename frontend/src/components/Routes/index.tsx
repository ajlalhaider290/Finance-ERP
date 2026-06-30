import React , { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router";
import RequireAuth from '@/util/RequireAuth';
import NotAuthPage from '@/routers/common/notAuth'
import NotFoundPage from '@/routers/common/notFound'
import ForbiddenPage from '@/routers/common/forbidden'
import { useAppDispatch, useAppSelector } from '@/store';
import { AppArea, areaConfigurations, getAreaDashboardPath } from '@/config/areas/areaConfig';
import { publicRoutes } from '@/config/routes';
import useCurrentArea from '@/hooks/useCurrentArea';
import { setArea } from '@/store/slice/sessionSlice';
import { Spinner } from '../ui/spinner';

  const HomePage = React.lazy(() => import('@/routers/common/home'));

  const OAuthAuthorizePage = React.lazy(() => import('@/routers/mcp/oauth/authorize'));

const ROUTE_SCOPE: Record<string, string[]> = {
  home: [],
  dashboard: [],
  userProfile: [],
  userProfileEdit: [],
  'reimbursement-request': ['user:employee', 'user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'approval-history': ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'approval-task': ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'company-entity': ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'customer': ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'expense-category': ['user:approver', 'user:superAdmin'],
  'intercompany-settlement-record': ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'intercompany-transaction': ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'invoice-document': ['user:accountant', 'user:superAdmin'],
  'invoice-line-item': ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
  invoice: ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'journal-entry': ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'journal-entry-line': ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'payment-allocation': ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
  payment: ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
  'reimbursement-document': ['user:superAdmin'],
  'reimbursement-status-history': ['user:superAdmin'],
  'tax-code': ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
  user: ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
  vendor: ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
};
  
interface AppProps {
	doc: HTMLElement
}
const AppRoutes : React.FC<AppProps> = ({doc}) => {
	const {dir, isLoggedIn, user, area} = useAppSelector((state) => state.session);
	 doc.dir = dir  === 'rtl' ? 'rtl' : 'ltr';

   const dispatch = useAppDispatch();
   const routeArea = useCurrentArea();
   
   doc.dir = dir  === 'rtl' ? 'rtl' : 'ltr';
  
   // Sync Redux store area with current route
   useEffect(() => {
    if (routeArea !== area && routeArea !== 'public') {
     dispatch(setArea(routeArea));
    }
   }, [routeArea, area, dispatch]);     

const defaultAreaAccess: string[] = ['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee'];

 // Helper function to check if user has access to an area
 const hasAreaAccess = (areaKey: AppArea): boolean => {
  if (!user || !isLoggedIn) return false;
  
  switch(areaKey) {
    case 'default':
		return user.scope.some((role:string) => defaultAreaAccess.includes(role))

    default:
      return false;
  }
};

 const hasRouteAccess = (routeKey: string): boolean => {
  if (!user || !isLoggedIn) return false;
  const requiredScopes = ROUTE_SCOPE[routeKey];
  if (!requiredScopes) return false;
  if (requiredScopes.length === 0) return true;
  return user.scope.some((scope: string) => requiredScopes.includes(scope));
};

 // Determine which area to render routes for based on current route
 const areaToRender = isLoggedIn ? (area as AppArea) : 'public';


 // Helper function to render routes for a specific area
  const renderAreaRoutes = (areaKey: AppArea) => {
    const config = areaConfigurations[areaKey];
    const Layout = config.layout;

    return (
      <Route element={<Layout />}>
        <Route key="home" path="/" element={
          <Suspense fallback={<div className="flex items-center justify-center h-1/2"><Spinner /></div>}>
            <HomePage />
          </Suspense>
        } />
        <Route key="notAuth" path="/notAuth" element={<NotAuthPage />} />
        <Route key="forbidden" path="/forbidden" element={<ForbiddenPage />} />

        {config.requiresAuth ? (
          <Route element={<RequireAuth />}>
            {config.routes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                element={
                  hasRouteAccess(route.key) ? (
                    <Suspense fallback={<div className="flex items-center justify-center h-1/2"><Spinner /></div>}>
                      <route.component />
                    </Suspense>
                  ) : (
                    <Navigate to="/forbidden" replace />
                  )
                }
              />
            ))}
          </Route>
        ) : (
          config.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-1/2"><Spinner /></div>}>
                  <route.component />
                </Suspense>
              }
            />
          ))
        )}

        <Route key="notfound" path="*" element={<NotFoundPage />} />
      </Route>
    );
  }; 


return (	 
    <Routes>
        {/* OAuth consent page must be accessible regardless of login state */}
        <Route path="/oauth/authorize" element={
          <Suspense fallback={<div className="flex items-center justify-center h-1/2"><Spinner /></div>}>
            <OAuthAuthorizePage />
          </Suspense>
        } />
      
        {!isLoggedIn && renderAreaRoutes('public')}       
        {isLoggedIn && hasAreaAccess(areaToRender) && renderAreaRoutes(areaToRender)}
        {isLoggedIn && !hasAreaAccess(areaToRender) && renderAreaRoutes('default')}
        {isLoggedIn && publicRoutes.map(route => (
            <Route key={`redirect-${route.key}`} path={route.path} element={<Navigate to={getAreaDashboardPath(area as AppArea)} replace />} />
        ))}
    </Routes>
  );
};

export default AppRoutes;
