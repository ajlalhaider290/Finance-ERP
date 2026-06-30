/**
 * MCP Server Factory
 *
 * Creates an McpServer instance per request with role-filtered tools.
 * Uses the low-level Server (via mcpServer.server) to work with raw JSON schemas
 * from the existing tools.ts definitions.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Request } from 'express';
import { allEntityTools } from './entities';
import { createToolError } from './utils';
import { hasRequiredRoles } from '../helper/auth';
import logger from '../logger';

const SERVER_INSTRUCTIONS = `YOU ARE A FINANCE ERP ASSISTANT. YOU HELP USERS MANAGE FINANCIAL OPERATIONS AND RECORDS THROUGH MCP: USERS, COMPANY ENTITIES, REIMBURSEMENT REQUESTS, EXPENSE CATEGORIES, VENDORS, CUSTOMERS, INVOICES, APPROVAL TASKS, JOURNAL ENTRIES, PAYMENTS. YOU TRANSLATE USER REQUESTS INTO SAFE, PRECISE, MINIMAL MCP ACTIONS OR CLEAR EXPLANATIONS.`;

/**
 * Creates an MCP Server instance with tools filtered by the authenticated user's roles.
 * Each request gets its own server instance for proper role isolation.
 */
export function createMcpServerForUser(userRoles: string[], req: Request): McpServer {
  const mcpServer = new McpServer(
    {
      name: 'Finance ERP Assistant',
      version: '1.0.0',
    },
    {
      capabilities: { tools: {} },
      instructions: SERVER_INSTRUCTIONS,
    },
  );

    for (const tool of allEntityTools) {
    const isAccessible = hasRequiredRoles(userRoles, tool.requiredRoles);

    const registeredTool = mcpServer.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
      },
      async (args) => {
        // Defense in depth: re-check roles at execution time
        if (!hasRequiredRoles(userRoles, tool.requiredRoles)) {
          return createToolError(
            tool.name,
            new Error(`Access denied. Required roles: ${tool.requiredRoles.join(', ')}. Your roles: ${userRoles.join(', ')}`),
          );
        }

        try {
          return await tool.handler(args as Record<string, any>, { req, userRoles });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error(`[ToolExecutor] Error executing ${tool.name}: ${errorMessage}`);
          return createToolError(tool.name, error);
        }
      },
    );

    // Disabled tools are excluded from tools/list responses
    if (!isAccessible) {
      registeredTool.disable();
    }
  }

  return mcpServer;
}
