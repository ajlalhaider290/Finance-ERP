import { EntityToolDefinition } from '../../types';
import { createToolResponse } from '../../utils';
import { createReimbursementRequestSchema } from './schema';
import { addReimbursementRequest } from '../../../modules/reimbursement-request/service';
import { createReimbursementRequestPayloadValidator } from '../../../modules/reimbursement-request/validation';

export const reimbursementRequestTools: EntityToolDefinition[] = [
  {
    name: 'createReimbursementRequest',
    description: 'Create a new reimbursement request.',
    requiredRoles: ['user:employee', 'user:superAdmin'],
    inputSchema: createReimbursementRequestSchema,
    handler: async (args, ctx) => {
      const validated = await createReimbursementRequestPayloadValidator.parseAsync(args);
      const result = await addReimbursementRequest(validated, (ctx.req as any).user);
      return createToolResponse({
        ...result,
        meta: { timestamp: new Date().toISOString() },
      });
    },
  },
];
