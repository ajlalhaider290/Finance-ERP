import { z } from 'zod';
import { Request } from 'express';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Context passed to every tool handler.
 * Wraps the Express request so entity handlers can extract auth info.
 */
export interface ToolRequestContext {
  req: Request;
  userRoles: string[];
}

/**
 * A single tool definition that an entity exports.
 * The inputSchema is a Zod schema used by the SDK for validation and JSON Schema generation.
 * The handler receives SDK-validated args plus the request context.
 */
export interface EntityToolDefinition {
  name: string;
  description: string;
  requiredRoles: string[];
  inputSchema: z.ZodObject<z.ZodRawShape>;
  handler: (args: Record<string, any>, ctx: ToolRequestContext) => Promise<CallToolResult>;
}
