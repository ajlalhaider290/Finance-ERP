import { z } from 'zod';

export const listApprovalTasksSchema = z.object({
  page: z.coerce.number().optional().describe('Page number for pagination (default 0)'),
  pageSize: z.coerce.number().optional().describe('Max results per page (default 10, max 100)'),
});

export const updateApprovalTaskSchema = z.object({
  taskId: z.uuid().describe('Task Id'),
  documentType: z.enum(['reimbursement', 'invoice', 'intercompany_transaction']).describe('Document Type'),
  documentId: z.string().describe('Document Id'),
  assignedToUserId: z.uuid().optional().describe('Assigned To User Id'),
  assignedToRole: z.string().optional().describe('Assigned To Role'),
  status: z.enum(['pending', 'approved', 'rejected', 'returned', 'delegated']).describe('Status'),
  userComment: z.string().optional().describe('User Comment'),
  actionedBy: z.uuid().optional().describe('Actioned By'),
  actionedAt: z.string().optional().describe('Actioned At'),
});

