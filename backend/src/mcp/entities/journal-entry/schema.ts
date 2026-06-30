import { z } from 'zod';

export const listJournalEntriesSchema = z.object({
  page: z.coerce.number().optional().describe('Page number for pagination (default 0)'),
  pageSize: z.coerce.number().optional().describe('Max results per page (default 10, max 100)'),
});

export const createJournalEntrySchema = z.object({
  entryDate: z.string().default(new Date().toISOString()).describe('Entry Date'),
  description: z.string().describe('Description'),
  sourceDocumentType: z.enum(['reimbursement', 'invoice', 'intercompany_transaction', 'payment']).optional().describe('Source Document Type'),
  sourceDocumentId: z.string().optional().describe('Source Document Id'),
  entityId: z.uuid().describe('Entity Id'),
  postedBy: z.uuid().optional().describe('Posted By'),
  postedAt: z.string().default(new Date().toISOString()).optional().describe('Posted At'),
  status: z.enum(['draft', 'submitted', 'approved', 'posted', 'cancelled']).default('draft').describe('Status'),
});

