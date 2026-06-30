import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Create a standardized success response for MCP tools.
 */
export function createToolResponse(data: unknown): CallToolResult {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
    isError: false,
  };
}

/**
 * Create a standardized error response for MCP tools.
 */
export function createToolError(toolName: string, error: unknown): CallToolResult {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            error: true,
            message: errorMessage,
            tool: toolName,
          },
          null,
          2,
        ),
      },
    ],
    isError: true,
  };
}
