import { EntityToolDefinition } from '../types';
import { approvalTaskTools } from './approval-task/tools';
import { companyEntityTools } from './company-entity/tools';
import { invoiceTools } from './invoice/tools';
import { journalEntryTools } from './journal-entry/tools';
import { paymentTools } from './payment/tools';
import { reimbursementRequestTools } from './reimbursement-request/tools';
import { userTools } from './user/tools';

/**
 * All entity tool definitions, aggregated.
 * To add a new entity: import its tools array and spread it here.
 */
export const allEntityTools: EntityToolDefinition[] = [
  ...approvalTaskTools,
  ...companyEntityTools,
  ...invoiceTools,
  ...journalEntryTools,
  ...paymentTools,
  ...reimbursementRequestTools,
  ...userTools,
];