import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from "react-router";
import { useAppSelector, useAppDispatch, RootState, store } from '@/store';
import { setSession, setLogout } from '@/store/slice/sessionSlice';
import { isTokenExpired, refreshTokenDirect, oauthConsentDirect } from '../service';
import { Card, CardContent, CardHeader, CardTitle, Button, Alert, AlertDescription } from '@/components/ui';
import { Spinner } from '@/components/ui/spinner';
import { Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const OAuthAuthorizePage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clientName = searchParams.get('client_name') || 'Unknown Client';
  const scopes = searchParams.get('scopes') || 'mcp:tools';

  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn, user } = session;
  const dispatch = useAppDispatch();
  const encodedRedirect = encodeURIComponent(`${location.pathname}${location.search}`);

  const [phase, setPhase] = useState<'login' | 'validating' | 'consent' | 'redirecting' | 'error'>(
    isLoggedIn ? 'validating' : 'login'
  );
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // When user becomes logged in (e.g., after redirect from login page), validate token
  useEffect(() => {
    if (isLoggedIn && phase === 'login') {
      setPhase('validating');
    }
  }, [isLoggedIn, phase]);

  // Token validation effect
  useEffect(() => {
    if (phase !== 'validating') return;

    const validateToken = async () => {
      const currentState = store.getState().session;
      const token = currentState.token;
      const refreshTokenValue = currentState.refreshToken;
      const userScope = currentState.user?.scope;

      // No token at all - go to login
      if (!token) {
        setPhase('login');
        return;
      }

      // Token is still valid - proceed to consent
      if (!isTokenExpired(token)) {
        setPhase('consent');
        return;
      }

      // Token expired - try refresh
      if (!refreshTokenValue) {
        dispatch(setLogout());
        setPhase('login');
        return;
      }

      try {
        const result = await refreshTokenDirect(refreshTokenValue, userScope);
        dispatch(
          setSession({
            ...currentState,
            token: result.token,
            refreshToken: result.refreshToken,
            user: result.user || currentState.user,
            isLoggedIn: true,
          }),
        );
        setPhase('consent');
      } catch {
        dispatch(setLogout());
        setPhase('login');
      }
    };

    validateToken();
  }, [phase, dispatch]);

  // --- Authorize action ---
  const handleAuthorize = useCallback(async () => {
    setIsAuthorizing(true);
    try {
      let currentToken = store.getState().session.token;

      // Pre-check: if token is expired, try one more refresh before calling consent
      if (!currentToken || isTokenExpired(currentToken)) {
        const currentState = store.getState().session;
        if (!currentState.refreshToken) {
          dispatch(setLogout());
          setPhase('login');
          return;
        }
        try {
          const result = await refreshTokenDirect(currentState.refreshToken, currentState.user?.scope);
          dispatch(
            setSession({
              ...currentState,
              token: result.token,
              refreshToken: result.refreshToken,
              user: result.user || currentState.user,
              isLoggedIn: true,
            }),
          );
          currentToken = result.token;
        } catch {
          dispatch(setLogout());
          setPhase('login');
          toast.error('Session expired. Please log in again.');
          return;
        }
      }

      // Call consent with the valid token, bypassing apiClient
      const { redirectUrl } = await oauthConsentDirect(sessionId!, currentToken!);
      setPhase('redirecting');
      window.location.replace(redirectUrl);
    } catch (error) {
      const err = error as { response?: { status?: number } };
      if (err?.response?.status === 401) {
        dispatch(setLogout());
        setPhase('login');
        toast.error('Session expired. Please log in again.');
      } else {
        setPhase('error');
        toast.error('Authorization failed. The session may have expired.');
      }
    } finally {
      setIsAuthorizing(false);
    }
  }, [sessionId, dispatch]);

  const handleDeny = () => {
    window.close();
  };

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <p>Invalid authorization request. Missing session ID.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-xl">Authorize MCP Connection</CardTitle>
          <p className="text-sm text-muted-foreground">
            <strong>{clientName}</strong> wants to connect to your account
          </p>
        </CardHeader>
        <CardContent>
          {phase === 'login' && (
            <div className="space-y-4">
             <p className="text-sm text-muted-foreground">
                Sign in to authorize this connection.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link to={`/userLogin?redirect=${encodedRedirect}`}>Login</Link>
                </Button>
              </div>
            </div>
          )}

          {phase === 'validating' && (
            <div className="text-center py-4">
              <Spinner className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Verifying your session...</p>
            </div>
          )}

          {phase === 'consent' && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Logged in as <strong>{user?.email}</strong>
              </div>

              <div className="border rounded-lg p-3 space-y-2">
                <p className="font-medium text-sm">This will grant access to:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  {scopes.split(' ').filter(Boolean).map(scope => (
                    <li key={scope}>
                      {scope === 'mcp:tools' ? 'MCP Tools (based on your role)' : scope}
                    </li>
                  ))}
                </ul>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Only authorize connections you trust. This will allow the client to use tools on your behalf.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleDeny}>
                  Deny
                </Button>
                <Button className="flex-1" onClick={handleAuthorize} disabled={isAuthorizing}>
                  {isAuthorizing && <Spinner className="mr-2" />}
                  Authorize
                </Button>
              </div>
            </div>
          )}

          {phase === 'redirecting' && (
            <div className="text-center py-4">
              <Spinner className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Authorizing... redirecting now.</p>
            </div>
          )}

          {phase === 'error' && (
            <div className="text-center py-4 space-y-2">
              <AlertTriangle className="h-8 w-8 mx-auto text-destructive" />
              <p>Authorization failed.</p>
              <p className="text-sm text-muted-foreground">The session may have expired. Please close this window and try again.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthAuthorizePage;

