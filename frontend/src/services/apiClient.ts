import axios from 'axios';
import { BASE_URL, PERSIST_STORE_NAME } from '@/config/app';
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/config/constant';
import { store } from '@/store';
import { setSession, setLogout } from '@/store/slice/sessionSlice';
import { toast } from 'sonner';
import pluralize from 'pluralize';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

const getLoginRedirectPath = () => {
  const currentPath = `${window.location.pathname}${window.location.search}`;

  if (!currentPath || currentPath === '/' || currentPath.startsWith('/userLogin')) {
    return '/userLogin';
  }

  return `/userLogin?redirect=${encodeURIComponent(currentPath)}`;
};

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

// Get user type from scope for dynamic auth endpoints
// scope example: ["user", "user:admin"] → returns "user"
// scope example: ["admin", "admin:superAdmin"] → returns "admin"
const getUserTypeFromScope = (scope: string[] | undefined): string => {
  if (!scope || scope.length === 0) {
    return 'users'; // default fallback
  }
  // Find the scope entry without ":" (base user type)
  const baseType = scope.find((s) => !s.includes(':'));
  if (baseType) {
    // Convert to plural form for API endpoint (user → users, admin → admins, etc.)
    return pluralize.plural(baseType);
  }
  // Fallback: extract from first scope with ":" (e.g., "user:admin" → "users")
  const firstScope = scope[0];
  const userType = firstScope.split(':')[0];
  return `${pluralize.plural(userType)}`;
};

const refreshToken = async () => {
  try {
    const state = store.getState();
    const refreshTokenValue = state.session?.refreshToken;
    const userScope = state.session?.user?.scope;

    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    // Get dynamic auth endpoint based on user type
    const userType = getUserTypeFromScope(userScope);

    // Use direct axios call to avoid interceptors and circular dependency
    const response = await axios.post(
      `${BASE_URL}/${userType}-auth/refresh-token`,
      {
        refreshToken: refreshTokenValue,
      },
      {
        timeout: 5000,
      },
    );

    const { token: newToken, refreshToken: newRefreshToken, user } = response.data;

    if (!newToken || !newRefreshToken) {
      throw new Error('Invalid tokens received from refresh endpoint');
    }

    const currentSession = store.getState().session;
    store.dispatch(
      setSession({
        ...currentSession,
        token: newToken,
        refreshToken: newRefreshToken,
        user: user || currentSession.user,
        isLoggedIn: true,
      }),
    );

    return newToken;
  } catch (error) {
    console.error('Token refresh failed:', (error as Error)?.message || 'Unknown error');
    throw error;
  }
};

const handleLogout = () => {
  processQueue(new Error('Session expired'), null);
  isRefreshing = false;

  localStorage.removeItem('persist:' + PERSIST_STORE_NAME);
  sessionStorage.removeItem('persist:' + PERSIST_STORE_NAME);

  store.dispatch(setLogout());

  toast.error('Session expired. Please login again.');

  window.location.replace(getLoginRedirectPath());
};

// Request interceptor to add authorization token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from Redux store
    const state = store.getState();
    const token = state.session?.token;

    if (token) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    const data = response.data;
    // Detect API-level errors returned with HTTP 200
    if (data && (data.errorCode || data.isError === true)) {
      const error = new axios.AxiosError(
        data.message || 'An error occurred',
        'API_ERROR',
        response.config,
        response.request,
        response,
      );
      return Promise.reject(error);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // ===== 403 FORBIDDEN - Authorization failure (user authenticated but not allowed) =====
    // Do NOT try to refresh token - user is authenticated but lacks permission
    if (status === 403) {
      const attemptedUrl = originalRequest.url || window.location.pathname;
      const errorMessage = error.response?.data?.message || 'You do not have permission to access this resource';
      const requiredRole = error.response?.data?.requiredRole || null;

      // Store context for the forbidden page
      sessionStorage.setItem(
        'forbiddenContext',
        JSON.stringify({
          attemptedUrl,
          errorMessage,
          requiredRole,
          timestamp: Date.now(),
        }),
      );

      toast.error('Access denied - insufficient permissions');
      window.location.replace('/forbidden');
      return Promise.reject(error);
    }

    // ===== 401 UNAUTHORIZED - Account not activated or blocked =====
    const errorCode = error.response?.data?.errorCode;
    if (status === 401 && (errorCode === 'ACCOUNT_NOT_ACTIVATED' || errorCode === 'ACCOUNT_BLOCKED')) {
      return Promise.reject(error);
    }
      
    // ===== 401 UNAUTHORIZED - Authentication failure =====
    if (status === 401 && !originalRequest._retry) {
      // Skip refresh if this IS the refresh endpoint
      if (originalRequest.url?.includes('/refresh-token')) {
        console.warn('Refresh token endpoint failed, logging out');
        handleLogout();
        return Promise.reject(error);
      }

      // Check if refresh token exists - if not, logout immediately
      const state = store.getState();
      const refreshTokenValue = state.session?.refreshToken;
      if (!refreshTokenValue) {
        console.warn('No refresh token available, logging out');
        handleLogout();
        return Promise.reject(error);
      }

      // Queue mechanism for concurrent requests during refresh
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${token}`;
            originalRequest._retry = true;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        isRefreshing = false;
        processQueue(null, newToken);
        originalRequest.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        console.warn('Token refresh failed, logging out user');
        isRefreshing = false;
        processQueue(refreshError, null);
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    // ===== 500+ Server errors =====
    if (status && status >= 500) {
      console.error('Server error:', error.response?.data);
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  },
);

export default apiClient; 
