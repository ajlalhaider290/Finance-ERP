/**
 * MCP OAuth Server Provider
 *
 * Implements the OAuthServerProvider interface from the MCP SDK.
 * Integrates with the existing user authentication system (email/password + JWT).
 *
 * Flow:
 * 1. Client (Claude.ai) discovers OAuth metadata via /.well-known/oauth-authorization-server
 * 2. Client dynamically registers via /register
 * 3. Client redirects user to /authorize
 * 4. Provider redirects to React frontend for login/consent
 * 5. Frontend calls POST /oauth/consent with JWT (already authenticated user)
 * 6. Provider generates auth code, returns redirect URL to frontend
 * 7. Frontend redirects to MCP client with auth code
 * 8. Client exchanges code for access token via /token
 * 9. Client uses access token for MCP requests
 */

import { randomUUID } from 'node:crypto';
import { Response } from 'express';
import { OAuthServerProvider } from '@modelcontextprotocol/sdk/server/auth/provider.js';
import { OAuthRegisteredClientsStore } from '@modelcontextprotocol/sdk/server/auth/clients.js';
import { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import { OAuthClientInformationFull, OAuthTokens } from '@modelcontextprotocol/sdk/shared/auth.js';
import { InvalidRequestError } from '@modelcontextprotocol/sdk/server/auth/errors.js';
import { env } from '../../config/env';
import logger from '../../logger';

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthorizationParams {
  state?: string;
  scopes?: string[];
  codeChallenge: string;
  redirectUri: string;
  resource?: URL;
}

export interface PendingAuthorization {
  client: OAuthClientInformationFull;
  params: AuthorizationParams;
  createdAt: number;
}

interface StoredToken {
  token: string;
  clientId: string;
  scopes: string[];
  expiresAt: number;
  resource?: URL;
  userData: Record<string, any>;
}

// ─── In-Memory Clients Store ─────────────────────────────────────────────────

export class McpClientsStore implements OAuthRegisteredClientsStore {
  private clients = new Map<string, OAuthClientInformationFull>();

  async getClient(clientId: string): Promise<OAuthClientInformationFull | undefined> {
    return this.clients.get(clientId);
  }

  async registerClient(clientMetadata: OAuthClientInformationFull): Promise<OAuthClientInformationFull> {
    this.clients.set(clientMetadata.client_id, clientMetadata);
    return clientMetadata;
  }
}

// ─── OAuth Provider ──────────────────────────────────────────────────────────

export class McpOAuthProvider implements OAuthServerProvider {
  readonly clientsStore = new McpClientsStore();

  // Pending authorization requests (keyed by temp session ID)
  private pendingAuths = new Map<string, PendingAuthorization>();

  // Authorization codes (keyed by code)
  private codes = new Map<
    string,
    {
      client: OAuthClientInformationFull;
      params: AuthorizationParams;
      userData: Record<string, any>;
    }
  >();

  // Issued access tokens
  private tokens = new Map<string, StoredToken>();

  // ─── Authorization ───────────────────────────────────────────────────────

  /**
   * Called when a client redirects the user to /authorize.
   * Redirects to the React frontend for login/consent UI.
   */
  async authorize(client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void> {
    // Validate redirect_uri
    const redirectUris = (client.redirect_uris || []).map((u: any) => u.toString());
    if (!redirectUris.includes(params.redirectUri)) {
      throw new InvalidRequestError('Unregistered redirect_uri');
    }

    // Store pending auth request with a session ID
    const sessionId = randomUUID();
    this.pendingAuths.set(sessionId, {
      client,
      params,
      createdAt: Date.now(),
    });

    // Clean up old pending auths (older than 10 minutes)
    const TEN_MINUTES = 10 * 60 * 1000;
    for (const [key, value] of this.pendingAuths) {
      if (Date.now() - value.createdAt > TEN_MINUTES) {
        this.pendingAuths.delete(key);
      }
    }

    // Redirect to React frontend for login/consent
    const frontendUrl = new URL('/oauth/authorize', env.FRONTEND_URL);
    frontendUrl.searchParams.set('session_id', sessionId);
    frontendUrl.searchParams.set('client_name', client.client_name || client.client_id);
    frontendUrl.searchParams.set('scopes', (params.scopes || []).join(' '));

    logger.info(`[MCP OAuth] Redirecting to frontend for consent: ${frontendUrl.origin}${frontendUrl.pathname}`);
    res.redirect(302, frontendUrl.toString());
  }

  /**
   * Returns pending authorization info for a given session ID.
   * Used by the consent endpoint to verify the session is valid.
   */
  getPendingAuth(sessionId: string): PendingAuthorization | undefined {
    return this.pendingAuths.get(sessionId);
  }

  // ─── Authorization Completion (called from /oauth/consent endpoint) ─────

  /**
   * Completes the authorization flow for an already-authenticated user.
   * Called from the POST /oauth/consent endpoint.
   *
   * Returns the redirect URL on success, or null on failure.
   */
  async completeAuthorization(sessionId: string, userData: Record<string, any>): Promise<string | null> {
    const pending = this.pendingAuths.get(sessionId);
    if (!pending) {
      return null;
    }

    this.pendingAuths.delete(sessionId);

    // Generate authorization code
    const code = randomUUID();
    this.codes.set(code, {
      client: pending.client,
      params: pending.params,
      userData,
    });

    // Build redirect URL with code
    const searchParams = new URLSearchParams({ code });
    if (pending.params.state !== undefined) {
      searchParams.set('state', pending.params.state);
    }

    const targetUrl = new URL(pending.params.redirectUri);
    targetUrl.search = searchParams.toString();

    const userIdentifier = userData.email || userData.username;
    logger.info(`[MCP OAuth] Generated auth code for user ${userIdentifier}, redirecting to: ${targetUrl.origin}${targetUrl.pathname}`);
    return targetUrl.toString();
  }

  // ─── PKCE ────────────────────────────────────────────────────────────────

  async challengeForAuthorizationCode(_client: OAuthClientInformationFull, authorizationCode: string): Promise<string> {
    logger.info(`[MCP OAuth] PKCE challenge requested for code: ${authorizationCode.substring(0, 8)}...`);
    const codeData = this.codes.get(authorizationCode);
    if (!codeData) {
      logger.error(`[MCP OAuth] PKCE challenge failed - invalid authorization code`);
      throw new Error('Invalid authorization code');
    }
    return codeData.params.codeChallenge;
  }

  // ─── Token Exchange ──────────────────────────────────────────────────────

  async exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
    _codeVerifier?: string,
    _redirectUri?: string,
    _resource?: URL,
  ): Promise<OAuthTokens> {
    logger.info(`[MCP OAuth] Token exchange requested - code: ${authorizationCode.substring(0, 8)}..., client: ${client.client_id.substring(0, 8)}...`);
    const codeData = this.codes.get(authorizationCode);
    if (!codeData) {
      logger.error(`[MCP OAuth] Token exchange failed - invalid authorization code`);
      throw new Error('Invalid authorization code');
    }

    if (codeData.client.client_id !== client.client_id) {
      throw new Error('Authorization code was not issued to this client');
    }

    // Consume the code (one-time use)
    this.codes.delete(authorizationCode);

    // Generate access token
    const accessToken = randomUUID();
    const expiresIn = 86400; // 24 hours

    this.tokens.set(accessToken, {
      token: accessToken,
      clientId: client.client_id,
      scopes: codeData.params.scopes || [],
      expiresAt: Date.now() + expiresIn * 1000,
      resource: codeData.params.resource,
      userData: codeData.userData,
    });

    // Generate refresh token
    const refreshToken = randomUUID();
    // Store refresh token linked to same user data
    this.tokens.set(refreshToken, {
      token: refreshToken,
      clientId: client.client_id,
      scopes: codeData.params.scopes || [],
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      resource: codeData.params.resource,
      userData: codeData.userData,
    });

    const userIdentifier = codeData.userData.email || codeData.userData.username;
    logger.info(`[MCP OAuth] Issued access token for user ${userIdentifier}`);

    return {
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: expiresIn,
      refresh_token: refreshToken,
      scope: (codeData.params.scopes || []).join(' '),
    };
  }

  async exchangeRefreshToken(client: OAuthClientInformationFull, refreshToken: string, _scopes?: string[], _resource?: URL): Promise<OAuthTokens> {
    const tokenData = this.tokens.get(refreshToken);
    if (!tokenData) {
      throw new Error('Invalid refresh token');
    }

    if (tokenData.clientId !== client.client_id) {
      throw new Error('Refresh token was not issued to this client');
    }

    if (tokenData.expiresAt < Date.now()) {
      this.tokens.delete(refreshToken);
      throw new Error('Refresh token expired');
    }

    // Generate new access token
    const newAccessToken = randomUUID();
    const expiresIn = 86400; // 24 hours

    this.tokens.set(newAccessToken, {
      ...tokenData,
      token: newAccessToken,
      expiresAt: Date.now() + expiresIn * 1000,
    });

    return {
      access_token: newAccessToken,
      token_type: 'bearer',
      expires_in: expiresIn,
      refresh_token: refreshToken,
      scope: tokenData.scopes.join(' '),
    };
  }

  // ─── Token Verification ──────────────────────────────────────────────────

  async verifyAccessToken(token: string): Promise<AuthInfo> {
    logger.info(`[MCP OAuth] Verifying access token: ${token.substring(0, 8)}...`);
    const tokenData = this.tokens.get(token);
    if (!tokenData) {
      logger.error(`[MCP OAuth] Token verification failed - token not found`);
      throw new Error('Invalid or expired token');
    }

    if (tokenData.expiresAt < Date.now()) {
      this.tokens.delete(token);
      logger.error(`[MCP OAuth] Token verification failed - token expired`);
      throw new Error('Token expired');
    }

    const userIdentifier = tokenData.userData.email || tokenData.userData.username;
    logger.info(`[MCP OAuth] Token verified for user ${userIdentifier}`);
    return {
      token,
      clientId: tokenData.clientId,
      scopes: tokenData.scopes,
      expiresAt: Math.floor(tokenData.expiresAt / 1000),
      resource: tokenData.resource,
      extra: tokenData.userData,
    };
  }

  /**
   * Gets user scope data from a verified token.
   * Used by the MCP handler to filter tools by role.
   */
  getTokenUserData(token: string): StoredToken | undefined {
    return this.tokens.get(token);
  }
}

// Singleton instance shared across the application
export const mcpOAuthProvider = new McpOAuthProvider();
