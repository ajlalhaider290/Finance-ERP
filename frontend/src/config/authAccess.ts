export type Action = 'view' | 'edit' | 'add' | 'delete' | 'upload' | 'detail';

		 type ObjectAccessRights = {
			 [object: string]: Action[];
		 };
		 
		 type AccessRights = {
			 [scope: string]: ObjectAccessRights;
		 };
		 
		 export const accessRights : AccessRights = {
  '_user:superAdmin': {
    approvalHistory: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    approvalTask: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    companyEntity: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    customer: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    expenseCategory: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    intercompanySettlementRecord: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    intercompanyTransaction: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    invoiceDocument: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    invoiceLineItem: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    invoice: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    journalEntry: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    journalEntryLine: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    paymentAllocation: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    payment: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    reimbursementDocument: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    reimbursementRequest: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    reimbursementStatusHistory: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    taxCode: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    user: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    vendor: ['add', 'delete', 'detail', 'edit', 'upload', 'view']
  },
  '_user:accountsManager': {
    approvalHistory: ['detail', 'view'],
    approvalTask: ['detail', 'edit', 'upload', 'view'],
    companyEntity: ['detail', 'view'],
    customer: ['detail', 'view'],
    intercompanySettlementRecord: ['add', 'detail', 'edit', 'upload', 'view'],
    intercompanyTransaction: ['detail', 'edit', 'upload', 'view'],
    invoiceLineItem: ['detail', 'view'],
    invoice: ['detail', 'edit', 'upload', 'view'],
    journalEntry: ['add', 'detail', 'upload', 'view'],
    journalEntryLine: ['add', 'detail', 'upload', 'view'],
    paymentAllocation: ['add', 'detail', 'edit', 'upload', 'view'],
    payment: ['add', 'detail', 'edit', 'upload', 'view'],
    reimbursementRequest: ['detail', 'edit', 'upload', 'view'],
    taxCode: ['detail', 'view'],
    user: ['detail', 'edit', 'upload', 'view'],
    vendor: ['detail', 'view']
  },
  '_user:accountant': {
    approvalHistory: ['detail', 'view'],
    approvalTask: ['detail', 'edit', 'upload', 'view'],
    companyEntity: ['detail', 'view'],
    customer: ['add', 'detail', 'edit', 'upload', 'view'],
    intercompanySettlementRecord: ['add', 'detail', 'edit', 'upload', 'view'],
    intercompanyTransaction: ['detail', 'view'],
    invoiceDocument: ['add', 'delete', 'detail', 'upload', 'view'],
    invoiceLineItem: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    invoice: ['add', 'detail', 'edit', 'upload', 'view'],
    journalEntry: ['add', 'detail', 'edit', 'upload', 'view'],
    journalEntryLine: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    paymentAllocation: ['add', 'detail', 'edit', 'upload', 'view'],
    payment: ['add', 'detail', 'edit', 'upload', 'view'],
    reimbursementRequest: ['detail', 'edit', 'upload', 'view'],
    taxCode: ['detail', 'view'],
    user: ['detail', 'view'],
    vendor: ['add', 'detail', 'edit', 'upload', 'view']
  },
  '_user:approver': {
    approvalHistory: ['detail', 'view'],
    approvalTask: ['detail', 'edit', 'upload', 'view'],
    companyEntity: ['detail', 'view'],
    expenseCategory: ['detail', 'view'],
    intercompanyTransaction: ['detail', 'edit', 'upload', 'view'],
    invoice: ['detail', 'edit', 'upload', 'view'],
    reimbursementRequest: ['detail', 'edit', 'upload', 'view'],
    user: ['detail', 'view']
  },
  '_user:employee': {
    approvalHistory: ['detail', 'view'],
    approvalTask: ['detail', 'view'],
    companyEntity: ['detail', 'view'],
    expenseCategory: ['detail', 'view'],
    reimbursementDocument: ['add', 'detail', 'upload', 'view'],
    reimbursementRequest: ['add', 'detail', 'edit', 'upload', 'view'],
    reimbursementStatusHistory: ['detail', 'view'],
    user: ['detail']
  }
};