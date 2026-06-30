import { z } from 'zod';

export const listInvoicesSchema = z.object({
  page: z.coerce.number().optional().describe('Page number for pagination (default 0)'),
  pageSize: z.coerce.number().optional().describe('Max results per page (default 10, max 100)'),
});

export const createInvoiceSchema = z.object({
  vendorId: z.uuid().optional().describe('Vendor Id'),
  customerId: z.uuid().optional().describe('Customer Id'),
  invoiceNumber: z.string().describe('Invoice Number'),
  invoiceDate: z.string().default(new Date().toISOString()).describe('Invoice Date'),
  dueDate: z.string().default(new Date().toISOString()).describe('Due Date'),
  currencyCode: z.string().default('USD').describe('Currency Code'),
  subtotal: z.number().default(0).describe('Subtotal'),
  taxAmount: z.number().default(0).describe('Tax Amount'),
  totalAmount: z.number().default(0).describe('Total Amount'),
  paidAmount: z.number().default(0).describe('Paid Amount'),
  balanceDue: z.string().default('0.00').describe('Balance Due'),
  paymentStatus: z.enum(['unpaid', 'partially paid', 'paid', 'overdue', 'cancelled']).default('unpaid').describe('Payment Status'),
  status: z.enum(['draft', 'submitted', 'under review', 'approved', 'rejected', 'returned', 'paid', 'cancelled']).default('draft').describe('Status'),
  currentApproverId: z.uuid().optional().describe('Current Approver Id'),
  invoiceDocumentId: z.uuid().optional().describe('Invoice Document Id'),
  entityId: z.uuid().describe('Entity Id'),
});

