import { z } from 'zod';

export const listPaymentsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number for pagination (default 0)'),
  pageSize: z.coerce.number().optional().describe('Max results per page (default 10, max 100)'),
});

export const createPaymentSchema = z.object({
  paymentDate: z.string().default(new Date().toISOString()).describe('Payment Date'),
  amount: z.number().default(0).describe('Amount'),
  currencyCode: z.string().default('USD').describe('Currency Code'),
  paymentMethod: z.enum(['bank_transfer', 'credit_card', 'check', 'cash']).default('bank_transfer').describe('Payment Method'),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled']).default('pending').describe('Status'),
  paidBy: z.uuid().optional().describe('Paid By'),
  entityId: z.uuid().describe('Entity Id'),
});

