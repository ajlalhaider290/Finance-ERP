import { EntityToolDefinition } from '../../types';
import { createToolResponse } from '../../utils';
import { listPaymentsSchema, createPaymentSchema } from './schema';
import { fetchPaymentList, addPayment } from '../../../modules/payment/service';
import { createPaymentPayloadValidator } from '../../../modules/payment/validation';

export const paymentTools: EntityToolDefinition[] = [
  {
    name: 'listPayments',
    description: 'List all payments.',
    requiredRoles: ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: listPaymentsSchema,
    handler: async (args) => {
      const result = await fetchPaymentList(args);
      return createToolResponse({
        ...result,
        meta: { ...result.meta, timestamp: new Date().toISOString() },
      });
    },
  },
  {
    name: 'createPayment',
    description: 'Create a new payment.',
    requiredRoles: ['user:accountant', 'user:accountsManager', 'user:superAdmin'],
    inputSchema: createPaymentSchema,
    handler: async (args) => {
      const validated = await createPaymentPayloadValidator.parseAsync(args);
      const result = await addPayment(validated);
      return createToolResponse({
        ...result,
        meta: { timestamp: new Date().toISOString() },
      });
    },
  },
];
