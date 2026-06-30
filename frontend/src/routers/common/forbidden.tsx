import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Home, LogOut, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';
import { RootState, useAppSelector, useAppDispatch } from '@/store';
import { setLogout } from '@/store/slice/sessionSlice';

interface ForbiddenContext {
  attemptedUrl: string;
  errorMessage: string;
  requiredRole: string | null;
  timestamp: number;
}

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state: RootState) => state.session);
  const { isLoggedIn, user } = session;
  const [context, setContext] = useState<ForbiddenContext | null>(null);

  useEffect(() => {
    // Get the forbidden context from session storage
    const storedContext = sessionStorage.getItem('forbiddenContext');
    if (storedContext) {
      try {
        const parsed = JSON.parse(storedContext) as ForbiddenContext;
        // Only use context if it's recent (within last 5 minutes)
        if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
          setContext(parsed);
        }
      } catch (e) {
        console.error('Failed to parse forbidden context:', e);
      }
      // Clear the context after reading
      sessionStorage.removeItem('forbiddenContext');
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(setLogout());
    window.location.replace('/');
  }, [dispatch]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Get user's current roles/scope
  const userScopes = user?.scope || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="flex flex-col gap-4 items-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <ShieldX className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
          <CardDescription className="text-lg">
            You are not allowed to view this content.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Show attempted URL */}
          {context?.attemptedUrl && (
            <div className="bg-muted rounded-lg p-4 text-left">
              <p className="text-sm text-muted-foreground mb-1">You tried to access:</p>
              <p className="font-mono text-sm break-all">{context.attemptedUrl}</p>
            </div>
          )}

          {/* Show role information */}
          {isLoggedIn && (
            <div className="bg-muted rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Your current role:</span>
                <span className="text-sm font-medium text-right">
                  {userScopes.length > 0 ? userScopes.join(', ') : 'No roles assigned'}
                </span>
              </div>
              {context?.requiredRole && (
                <div className="flex justify-between items-start">
                  <span className="text-sm text-muted-foreground">Required role:</span>
                  <span className="text-sm font-medium text-right">{context.requiredRole}</span>
                </div>
              )}
            </div>
          )}

          {/* Help text */}
          <p className="text-sm text-muted-foreground">
            If you think you need access to this page, please contact your administrator to grant you the necessary permissions.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <Button onClick={handleGoHome} className="w-full">
              <Home className="h-4 w-4 me-2" />
              Go to Home
            </Button>
            {isLoggedIn && (
              <Button variant="outline" onClick={handleLogout} className="w-full">
                <LogOut className="h-4 w-4 me-2" />
                Logout
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => (window.location.href = 'mailto:support@company.com')}
              className="w-full"
            >
              <Mail className="h-4 w-4 me-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForbiddenPage;
