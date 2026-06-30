import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateAccessToken, requireRoles } from '../../helper/auth';
import { validateZodSchema } from '../../middleware/zodValidation';
import { dashboardFilterValidator } from './validation';
import { DashboardFilters } from './types';
import { getTotalReimbursementRequests, getTotalInvoices, getTotalInvoiceAmount, getTotalPaymentsMade, getReimbursementRequestsByStatus, getInvoicesTrendByDate, getPaymentsByMethod } from './service';
export const DashboardRoutes: Router = Router();

DashboardRoutes.get('/total-reimbursement-requests',
	validateAccessToken,
	requireRoles(['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee']),
	validateZodSchema(dashboardFilterValidator, 'query'),
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const filters: DashboardFilters = {
			reimbursementRequestsExpenseDate: req.query.reimbursementRequestsExpenseDate as string | undefined,
			reimbursementRequestsExpenseDateOperator: req.query.reimbursementRequestsExpenseDateOperator as string | undefined,
			reimbursementRequestsStatus: req.query.reimbursementRequestsStatus as string | undefined,
			invoicesInvoiceDate: req.query.invoicesInvoiceDate as string | undefined,
			invoicesInvoiceDateOperator: req.query.invoicesInvoiceDateOperator as string | undefined,
			invoicesPaymentStatus: req.query.invoicesPaymentStatus as string | undefined,
		};
		const result:any = await getTotalReimbursementRequests(filters, (req as any).user);
		res.status(200).json(result);
	})
);

DashboardRoutes.get('/total-invoices',
	validateAccessToken,
	requireRoles(['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee']),
	validateZodSchema(dashboardFilterValidator, 'query'),
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const filters: DashboardFilters = {
			reimbursementRequestsExpenseDate: req.query.reimbursementRequestsExpenseDate as string | undefined,
			reimbursementRequestsExpenseDateOperator: req.query.reimbursementRequestsExpenseDateOperator as string | undefined,
			reimbursementRequestsStatus: req.query.reimbursementRequestsStatus as string | undefined,
			invoicesInvoiceDate: req.query.invoicesInvoiceDate as string | undefined,
			invoicesInvoiceDateOperator: req.query.invoicesInvoiceDateOperator as string | undefined,
			invoicesPaymentStatus: req.query.invoicesPaymentStatus as string | undefined,
		};
		const result:any = await getTotalInvoices(filters, (req as any).user);
		res.status(200).json(result);
	})
);

DashboardRoutes.get('/total-invoice-amount',
	validateAccessToken,
	requireRoles(['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee']),
	validateZodSchema(dashboardFilterValidator, 'query'),
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const filters: DashboardFilters = {
			reimbursementRequestsExpenseDate: req.query.reimbursementRequestsExpenseDate as string | undefined,
			reimbursementRequestsExpenseDateOperator: req.query.reimbursementRequestsExpenseDateOperator as string | undefined,
			reimbursementRequestsStatus: req.query.reimbursementRequestsStatus as string | undefined,
			invoicesInvoiceDate: req.query.invoicesInvoiceDate as string | undefined,
			invoicesInvoiceDateOperator: req.query.invoicesInvoiceDateOperator as string | undefined,
			invoicesPaymentStatus: req.query.invoicesPaymentStatus as string | undefined,
		};
		const result:any = await getTotalInvoiceAmount(filters, (req as any).user);
		res.status(200).json(result);
	})
);

DashboardRoutes.get('/total-payments-made',
	validateAccessToken,
	requireRoles(['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee']),
	validateZodSchema(dashboardFilterValidator, 'query'),
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const filters: DashboardFilters = {
			reimbursementRequestsExpenseDate: req.query.reimbursementRequestsExpenseDate as string | undefined,
			reimbursementRequestsExpenseDateOperator: req.query.reimbursementRequestsExpenseDateOperator as string | undefined,
			reimbursementRequestsStatus: req.query.reimbursementRequestsStatus as string | undefined,
			invoicesInvoiceDate: req.query.invoicesInvoiceDate as string | undefined,
			invoicesInvoiceDateOperator: req.query.invoicesInvoiceDateOperator as string | undefined,
			invoicesPaymentStatus: req.query.invoicesPaymentStatus as string | undefined,
		};
		const result:any = await getTotalPaymentsMade(filters, (req as any).user);
		res.status(200).json(result);
	})
);

DashboardRoutes.get('/reimbursement-requests-by-status',
	validateAccessToken,
	requireRoles(['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee']),
	validateZodSchema(dashboardFilterValidator, 'query'),
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const filters: DashboardFilters = {
			reimbursementRequestsExpenseDate: req.query.reimbursementRequestsExpenseDate as string | undefined,
			reimbursementRequestsExpenseDateOperator: req.query.reimbursementRequestsExpenseDateOperator as string | undefined,
			reimbursementRequestsStatus: req.query.reimbursementRequestsStatus as string | undefined,
			invoicesInvoiceDate: req.query.invoicesInvoiceDate as string | undefined,
			invoicesInvoiceDateOperator: req.query.invoicesInvoiceDateOperator as string | undefined,
			invoicesPaymentStatus: req.query.invoicesPaymentStatus as string | undefined,
		};
		const result:any = await getReimbursementRequestsByStatus(filters, (req as any).user);
		res.status(200).json(result);
	})
);

DashboardRoutes.get('/invoices-trend-by-date',
	validateAccessToken,
	requireRoles(['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee']),
	validateZodSchema(dashboardFilterValidator, 'query'),
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const filters: DashboardFilters = {
			reimbursementRequestsExpenseDate: req.query.reimbursementRequestsExpenseDate as string | undefined,
			reimbursementRequestsExpenseDateOperator: req.query.reimbursementRequestsExpenseDateOperator as string | undefined,
			reimbursementRequestsStatus: req.query.reimbursementRequestsStatus as string | undefined,
			invoicesInvoiceDate: req.query.invoicesInvoiceDate as string | undefined,
			invoicesInvoiceDateOperator: req.query.invoicesInvoiceDateOperator as string | undefined,
			invoicesPaymentStatus: req.query.invoicesPaymentStatus as string | undefined,
		};
		const result:any = await getInvoicesTrendByDate(filters, (req as any).user);
		res.status(200).json(result);
	})
);

DashboardRoutes.get('/payments-by-method',
	validateAccessToken,
	requireRoles(['user:superAdmin', 'user:accountsManager', 'user:accountant', 'user:approver', 'user:employee']),
	validateZodSchema(dashboardFilterValidator, 'query'),
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const filters: DashboardFilters = {
			reimbursementRequestsExpenseDate: req.query.reimbursementRequestsExpenseDate as string | undefined,
			reimbursementRequestsExpenseDateOperator: req.query.reimbursementRequestsExpenseDateOperator as string | undefined,
			reimbursementRequestsStatus: req.query.reimbursementRequestsStatus as string | undefined,
			invoicesInvoiceDate: req.query.invoicesInvoiceDate as string | undefined,
			invoicesInvoiceDateOperator: req.query.invoicesInvoiceDateOperator as string | undefined,
			invoicesPaymentStatus: req.query.invoicesPaymentStatus as string | undefined,
		};
		const result:any = await getPaymentsByMethod(filters, (req as any).user);
		res.status(200).json(result);
	})
);
