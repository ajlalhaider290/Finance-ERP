/**
 * OAuth Consent Handler
 *
 * Handles the frontend consent flow for MCP OAuth authorization.
 * Instead of a server-rendered login page, the frontend shows a consent UI
 * and calls these endpoints with the user's existing JWT session.
 *
 * Supports 1 user type: User.
 * The user type is detected from the scope array in the decoded JWT.
 */

import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { z } from 'zod';
import { User } from '../../models/user';
import { getScope, getAreaScope } from '../../helper/auth';
import { mcpOAuthProvider } from './provider';
import logger from '../../logger';

const consentSchema = z.object({
  session_id: z.uuid('Invalid session ID'),
});

/**
 * GET /oauth/consent-info?session_id=...
 * Returns info about the pending authorization so the frontend can display it.
 * Protected by validateAccessToken middleware.
 */
export async function handleConsentInfo(req: Request, res: Response): Promise<void> {
  const sessionId = req.query.session_id as string;
  if (!sessionId) {
    res.status(400).json({ error: 'Missing session_id' });
    return;
  }

  const pending = mcpOAuthProvider.getPendingAuth(sessionId);
  if (!pending) {
    res.status(404).json({ error: 'Authorization session expired or not found' });
    return;
  }

  res.json({
    clientName: pending.client.client_name || pending.client.client_id,
    clientUri: pending.client.client_uri || null,
    scopes: pending.params.scopes || [],
  });
}

/**
 * Detects user type from the decoded JWT scope and fetches the full user
 * record from the appropriate table, then builds a userData object matching
 * the same payload structure used by each auth service's login function.
 */
async function resolveUserData(decoded: any): Promise<{ userData: Record<string, any>; userType: string } | null> {
  const decodedScope: string[] = decoded.scope || [];

  if (decodedScope.includes('user')) {
    const user = await User.findOne({
      where: { userId: decoded.userId },
      attributes: [
// userId, email, username, password, role, department, entityId, createdAt, updatedAt
			'userId',
			'email',
			'username',
			'password',
			'role',
			'department',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "User".entity_id LIMIT 1)'), 'usersLabel'],
			'createdAt',
			'updatedAt',
      ],
    });
    if (!user) return null;

    const scope = await getScope(user, 'user');
    const areaScope = await getAreaScope(scope);
    const plain = user.get({ plain: true }) as any;
    return {
      userType: 'user',
      userData: {
        userId: plain.userId,
        email: plain.email,
        username: plain.username,
        role: plain.role,
        department: plain.department,
        entityId: plain.entityId,
        createdAt: plain.createdAt,
        updatedAt: plain.updatedAt,
        scope,
        areaScope,
      },
    };
  }

  return null;
}

/**
 * POST /oauth/consent
 * Body: { session_id: string }
 * Auth: Bearer JWT (existing frontend session token)
 *
 * Completes the MCP OAuth authorization flow using the already-authenticated user.
 * Supports User types.
 */
export async function handleOAuthConsent(req: Request, res: Response): Promise<void> {
  const parsed = consentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid session_id' });
    return;
  }

  const { session_id: sessionId } = parsed.data;

  try {
    // User is already verified by validateAccessToken middleware
    const decoded = (req as any).user;

    // Resolve user type and fetch full record from the correct table
    const result = await resolveUserData(decoded);
    if (!result) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    const { userData, userType } = result;

    const redirectUrl = await mcpOAuthProvider.completeAuthorization(
      sessionId,
      userData,
    );

    if (!redirectUrl) {
      res.status(400).json({ error: 'Authorization session expired. Please try again.' });
      return;
    }

    const userIdentifier = userData.email;
    logger.info(`[MCP OAuth] ${userType} ${userIdentifier} authorized via consent`);
    res.json({ redirectUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`[MCP OAuth] Consent error: ${message}`);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
}