import { mcpTokenRequestValidator } from './validation';
import { z } from 'zod';

export type MCPTokenRequest = z.infer<typeof mcpTokenRequestValidator>;
export type MCPTokenResponse = {
	token: string;
	expiresAt: string;
};
