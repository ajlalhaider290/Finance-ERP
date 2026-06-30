/**
 * MCP Streamable HTTP Handler
 *
 * Express route handlers for the MCP Streamable HTTP transport.
 * Creates a stateless per-request server + transport pair for proper
 * OAuth authentication and role-based tool filtering.
 */

import { Request, Response } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpServerForUser } from './server';
import logger from '../logger';

/**
 * Handles POST /mcp requests using Streamable HTTP transport.
 * Each request gets a fresh stateless transport + server.
 * Auth info comes from the SDK's requireBearerAuth middleware (req.auth).
 */
export async function handleMcpPost(req: Request, res: Response): Promise<void> {
  try {
    // Get user roles from OAuth token's extra data
    const authInfo = (req as any).auth;
    let userRoles: string[] = [];

    if (authInfo?.extra?.scope) {
      userRoles = authInfo.extra.scope as string[];
    } else if ((req as any).user?.scope) {
      // Fallback for legacy JWT auth (via validateAccessToken middleware)
      userRoles = (req as any).user.scope;
    }

    // Populate req.user for toolExecutor compatibility
    // Spread full userData so all user types (admin, driver, manager, user) are supported
    if (authInfo?.extra && !(req as any).user) {
      (req as any).user = { ...authInfo.extra };
    }

    // Create per-request server with role-filtered tools
    const mcpServer = createMcpServerForUser(userRoles, req);

    // Create stateless transport (no session management)
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    // Connect server to transport
    await mcpServer.connect(transport);

    // Delegate the HTTP request to the transport
    // Pass req.body as parsedBody since Express already parsed it
    await transport.handleRequest(req, res, req.body);

    // Clean up after response is sent
    res.on('close', () => {
      transport.close();
      mcpServer.close();
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`[MCP Streamable] Error: ${message}`);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal server error' },
        id: null,
      });
    }
  }
}

/**
 * Handles GET /mcp requests.
 * In stateless mode, SSE streams are not supported.
 */
export async function handleMcpGet(_req: Request, res: Response): Promise<void> {
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed.',
      },
      id: null,
    }),
  );
}

/**
 * Handles DELETE /mcp requests.
 * In stateless mode, there are no sessions to terminate.
 */
export async function handleMcpDelete(_req: Request, res: Response): Promise<void> {
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed.',
      },
      id: null,
    }),
  );
}
