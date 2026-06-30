import axios from 'axios';
import { MCPTokenRequest, MCPTokenResponse } from './types';
import apiClient from '@/services/apiClient';
import { BASE_URL } from '@/config/app';

export const createMcpToken = async (request: MCPTokenRequest) => {
  return await apiClient.post<MCPTokenResponse>('/users-auth/mcp-token', request);
};

export const oauthConsent = async (sessionId: string) => {
  return await apiClient.post<{ redirectUrl: string }>('/oauth/consent', { session_id: sessionId });
};

/**
 * Decode JWT payload and check if expired.
 * Returns true if token is expired or unparseable.
 * Uses a 30-second buffer to avoid race conditions.
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now() + 30000;
  } catch {
    return true;
  }
};

/**
 * Attempt token refresh using a direct axios call (bypasses apiClient interceptors).
 * This prevents handleLogout() from firing and redirecting to '/'.
 */
export const refreshTokenDirect = async (
  currentRefreshToken: string,
  userScope: string[] | undefined,
): Promise<{ token: string; refreshToken: string; user: unknown }> => {
  let userType = 'users';
  if (userScope && userScope.length > 0) {
    const baseType = userScope.find((s) => !s.includes(':'));
    if (baseType) {
      userType = `${baseType}s`;
    } else {
      userType = `${userScope[0].split(':')[0]}s`;
    }
  }

  const response = await axios.post(
    `${BASE_URL}/${userType}-auth/refresh-token`,
    { refreshToken: currentRefreshToken },
    { timeout: 5000 },
  );

  const { token, refreshToken: newRefreshToken, user } = response.data;
  if (!token || !newRefreshToken) {
    throw new Error('Invalid tokens received from refresh endpoint');
  }

  return { token, refreshToken: newRefreshToken, user };
};

/**
 * Call /oauth/consent with an explicit token, bypassing apiClient interceptors.
 * This prevents handleLogout() from firing on 401.
 */
export const oauthConsentDirect = async (
  sessionId: string,
  token: string,
): Promise<{ redirectUrl: string }> => {
  const response = await axios.post<{ redirectUrl: string }>(
    `${BASE_URL}/oauth/consent`,
    { session_id: sessionId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    },
  );
  return response.data;
};
