import { z } from 'zod';

export const createReimbursementRequestSchema = z.object({
  employeeId: z.uuid().describe('Employee Id'),
  businessPurpose: z.string().describe('Business Purpose'),
  expenseDate: z.string().default(new Date().toISOString()).describe('Expense Date'),
  categoryId: z.uuid().describe('Category Id'),
  costCenter: z.string().optional().describe('Cost Center'),
  department: z.string().optional().describe('Department'),
  currencyCode: z.string().default('USD').describe('Currency Code'),
  amount: z.number().default(0).describe('Amount'),
  taxAmount: z.number().default(0).describe('Tax Amount'),
  totalAmount: z.string().default('0.00').describe('Total Amount'),
  status: z.enum(['draft', 'submitted', 'under review', 'approved', 'rejected', 'returned', 'paid', 'cancelled']).default('draft').describe('Status'),
  currentApproverId: z.uuid().optional().describe('Current Approver Id'),
  paidDate: z.string().default(new Date().toISOString()).optional().describe('Paid Date'),
  entityId: z.uuid().describe('Entity Id'),
});

