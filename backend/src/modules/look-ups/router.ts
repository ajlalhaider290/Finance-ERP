import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { selectUser, selectCompanyEntity, selectVendor, selectIntercompanySettlementRecord, selectCustomer, selectJournalEntryLine, selectTaxCode, selectInvoiceLineItem, selectIntercompanyTransaction, selectInvoice, selectPaymentAllocation, selectJournalEntry, selectInvoiceDocument, selectExpenseCategory, selectApprovalTask, selectReimbursementRequest, selectPayment, selectApprovalHistory, selectReimbursementDocument, selectReimbursementStatusHistory } from './service';
import { validateAccessToken, requireRoles } from '../../helper/auth';

export const LookupRoutes: Router = Router();

LookupRoutes.use(validateAccessToken);

LookupRoutes.get('/user', requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectUser();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/company-entity', requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectCompanyEntity();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/vendor', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectVendor();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/intercompany-settlement-record', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectIntercompanySettlementRecord();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/customer', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectCustomer();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/journal-entry-line', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectJournalEntryLine();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/tax-code', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectTaxCode();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/invoice-line-item', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectInvoiceLineItem();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/intercompany-transaction', requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectIntercompanyTransaction();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/invoice', requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectInvoice();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/payment-allocation', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectPaymentAllocation();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/journal-entry', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectJournalEntry();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/invoice-document', requireRoles(['user:accountant','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectInvoiceDocument();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/expense-category', requireRoles(['user:employee','user:approver','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectExpenseCategory();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/approval-task', requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectApprovalTask();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/reimbursement-request', requireRoles(['user:employee','user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectReimbursementRequest((req as any).user);
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/payment', requireRoles(['user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectPayment();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/approval-history', requireRoles(['user:approver','user:accountant','user:accountsManager','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectApprovalHistory();
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/reimbursement-document', requireRoles(['user:employee','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectReimbursementDocument((req as any).user);
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
LookupRoutes.get('/reimbursement-status-history', requireRoles(['user:employee','user:superAdmin']),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await selectReimbursementStatusHistory((req as any).user);
    const status = (result as any).statusCode || 200;
    res.status(status).json(result);
  }),
);
