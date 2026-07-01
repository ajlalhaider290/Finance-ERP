import { EntityToolDefinition } from '../../types';
import { createToolResponse } from '../../utils';
import { listInvoicesSchema, createInvoiceSchema } from './schema';
import { fetchInvoiceList, addInvoice } from '../../../modules/invoice/service';
import { createInvoicePayloadValidator } from '../../../modules/invoice/validation';

export const invoiceTools: EntityToolDefinition[] = [
  {
    name: 'listInvoices',
    description: 'List all invoices.',
    requiredRoles: ['user:approver', 'user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: listInvoicesSchema,
    handler: async (args, ctx) => {
      const result = await fetchInvoiceList(args, (ctx.req as any).user);
      return createToolResponse({
        ...result,
        meta: { ...result.meta, timestamp: new Date().toISOString() },
      });
    },
  },
  {
    name: 'createInvoice',
    description: 'Create a new invoice.',
    requiredRoles: ['user:accountant', 'user:superAdmin'],
    inputSchema: createInvoiceSchema,
    handler: async (args, ctx) => {
      const validated = await createInvoicePayloadValidator.parseAsync(args);
      const result = await addInvoice(validated, (ctx.req as any).user);
      return createToolResponse({
        ...result,
        meta: { timestamp: new Date().toISOString() },
      });
    },
  },
];
