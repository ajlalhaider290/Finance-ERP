import { z } from 'zod';

export const dashboardFilterValidator = z.object({
	reimbursementRequestsExpenseDate: z.coerce.date().optional().nullable(),
	reimbursementRequestsExpenseDateOperator: z.enum(['eq', 'gt', 'gte', 'lt', 'lte', 'ne']).optional(),
	reimbursementRequestsStatus: z.enum(['draft', 'submitted', 'under review', 'approved', 'rejected', 'returned', 'paid', 'cancelled']).optional().nullable(),
	invoicesInvoiceDate: z.coerce.date().optional().nullable(),
	invoicesInvoiceDateOperator: z.enum(['eq', 'gt', 'gte', 'lt', 'lte', 'ne']).optional(),
	invoicesPaymentStatus: z.enum(['unpaid', 'partially paid', 'paid', 'overdue', 'cancelled']).optional().nullable(),
});
