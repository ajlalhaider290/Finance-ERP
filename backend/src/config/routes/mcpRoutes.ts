/**
 * MCP Server Routes
 * Express router for MCP server endpoints
 *
 * Streamable HTTP transport with OAuth 2.0 authentication.
 */

import { Router } from 'express';
import { requireBearerAuth } from '@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js';
import { getOAuthProtectedResourceMetadataUrl } from '@modelcontextprotocol/sdk/server/auth/router.js';
import { handleMcpPost, handleMcpGet, handleMcpDelete } from '../../mcp/streamableHandler';
import { mcpOAuthProvider } from '../../mcp/oauth/provider';
import { env } from '../env';

const mcpRouter: Router = Router();

// Bearer auth middleware using the MCP SDK (validates OAuth tokens)
const mcpServerUrl = new URL(env.MCP_SERVER_URL || 'http://localhost:8000');
const mcpBearerAuth = requireBearerAuth({
  verifier: mcpOAuthProvider,
  resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(new URL('/mcp', mcpServerUrl)),
});

// Streamable HTTP transport - OAuth 2.0 authenticated
mcpRouter.post('/', mcpBearerAuth, handleMcpPost);
mcpRouter.get('/', mcpBearerAuth, handleMcpGet);
mcpRouter.delete('/', mcpBearerAuth, handleMcpDelete);

export { mcpRouter };

