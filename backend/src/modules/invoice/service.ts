import { Op, Sequelize, Transaction, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { Invoice } from '../../models/invoice';
import { Vendor } from '../../models/vendor';
import { Customer } from '../../models/customer';
import { User } from '../../models/user';
import { InvoiceDocument } from '../../models/invoice-document';
import { CompanyEntity } from '../../models/company-entity';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict, forbidden } from '../../errors';
import {
	AuthenticatedUserContext,
	isAccountant,
	isAccountsManager,
	isApprover,
	isSuperAdmin,
} from '../reimbursement-request/access';


import { InvoicePrimaryKeys, CreateInvoiceInput, UpdateInvoiceInput, QueryInvoiceInput, InvoiceWorkflowAction } from './types';

const emptyInvoiceAccessWhere = { invoiceId: '00000000-0000-0000-0000-000000000000' };

export const buildInvoiceAccessWhere = (user: AuthenticatedUserContext): WhereOptions<Invoice> => {
	if (isSuperAdmin(user)) {
		return {};
	}

	if (isAccountsManager(user) || isAccountant(user)) {
		return user.entityId ? { entityId: user.entityId } : {};
	}

	if (isApprover(user)) {
		return { currentApproverId: user.userId };
	}

	return emptyInvoiceAccessWhere;
};

const canCreateInvoices = (user: AuthenticatedUserContext) => isSuperAdmin(user) || isAccountsManager(user) || isAccountant(user);

const canReviewInvoice = (invoice: Invoice, user: AuthenticatedUserContext) =>
	isSuperAdmin(user) || isAccountsManager(user) || (isApprover(user) && invoice.currentApproverId === user.userId);

const calculateBalanceDue = (totalAmount: number | string, paidAmount: number | string = 0) => {
	const balance = Number(totalAmount || 0) - Number(paidAmount || 0);
	return balance.toFixed(2);
};

const addDays = (date: Date, days: number) => {
	const nextDate = new Date(date);
	nextDate.setDate(nextDate.getDate() + days);
	return nextDate;
};

const buildSystemInvoiceNumber = (prefix: string, id: string) => `${prefix}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${id.slice(0, 8).toUpperCase()}`;

export const fetchInvoiceList = async (params: QueryInvoiceInput, user: AuthenticatedUserContext) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;
	const where = buildInvoiceAccessWhere(user);

	const { count, rows } = await Invoice.findAndCountAll({
		attributes: [
// vendorId, customerId, invoiceNumber, invoiceDate, dueDate, currencyCode, subtotal, taxAmount, totalAmount, paidAmount, balanceDue, paymentStatus, status, currentApproverId, invoiceDocumentId, entityId, sourceType, sourceReimbursementRequestId, sourceIntercompanyTransactionId, createdAt, updatedAt
			'vendorId',
			[Sequelize.literal('(SELECT vendor_name FROM vendors  WHERE vendors.vendor_id = "Invoice".vendor_id LIMIT 1)'), 'invoicesFromVendorLabel'],
			'customerId',
			[Sequelize.literal('(SELECT customer_name FROM customers  WHERE customers.customer_id = "Invoice".customer_id LIMIT 1)'), 'invoicesToCustomerLabel'],
			'invoiceNumber',
			'invoiceDate',
			'dueDate',
			'currencyCode',
			'subtotal',
			'taxAmount',
			'totalAmount',
			'paidAmount',
			'balanceDue',
			'paymentStatus',
			'status',
			'currentApproverId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "Invoice".current_approver_id LIMIT 1)'), 'invoiceApprovalsAssignedLabel'],
			'invoiceDocumentId',
			[Sequelize.literal('(SELECT file_url FROM invoice_documents  WHERE invoice_documents.document_id = "Invoice".invoice_document_id LIMIT 1)'), 'invoiceRecordsLabel'],
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "Invoice".entity_id LIMIT 1)'), 'invoicesLabel'],
			'sourceType',
			'sourceReimbursementRequestId',
			[Sequelize.literal('(SELECT business_purpose FROM reimbursement_requests WHERE reimbursement_requests.reimbursement_request_id = "Invoice".source_reimbursement_request_id LIMIT 1)'), 'sourceReimbursementRequestLabel'],
			'sourceIntercompanyTransactionId',
			[Sequelize.literal('(SELECT transaction_type FROM intercompany_transactions WHERE intercompany_transactions.transaction_id = "Invoice".source_intercompany_transaction_id LIMIT 1)'), 'sourceIntercompanyTransactionLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Invoice"."invoice_number", 'primaryKeys', json_build_object('invoiceId', "Invoice"."invoice_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		where,
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectInvoice = async (user: AuthenticatedUserContext) => {
	const where = buildInvoiceAccessWhere(user);

	const results = await Invoice.findAll({
		attributes: [
			['invoice_id', 'value'],
			['invoice_number', 'label'],
		],
		where,
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addInvoice = async (payload: CreateInvoiceInput, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	if (!canCreateInvoices(user)) {
		throw forbidden('You do not have permission to create invoices');
	}

	// Prepare payload data and add properties

	const invoiceDefaultPayload = {
			invoiceDate: payload.invoiceDate ?? new Date(),
			dueDate: payload.dueDate ?? new Date(),
			currencyCode: payload.currencyCode ?? "USD",
			subtotal: payload.subtotal ?? 0,
			taxAmount: payload.taxAmount ?? 0,
			totalAmount: payload.totalAmount ?? 0,
			paidAmount: payload.paidAmount ?? 0,
			balanceDue: payload.balanceDue ?? calculateBalanceDue(payload.totalAmount ?? 0, payload.paidAmount ?? 0),
			paymentStatus: payload.paymentStatus ?? "unpaid",
			status: payload.status ?? "draft",
			sourceType: payload.sourceType ?? "manual",
			sourceReimbursementRequestId: payload.sourceReimbursementRequestId ?? null,
			sourceIntercompanyTransactionId: payload.sourceIntercompanyTransactionId ?? null,
	};
	const invoice = await Invoice.create({...payload, ...invoiceDefaultPayload}, { transaction: t });

	return invoice.get({ plain: true });
	});
};

export const editInvoice = async (params: InvoicePrimaryKeys, user: AuthenticatedUserContext): Promise<Invoice> => {
	// Initialize filters and include relationships
	const where = buildInvoiceAccessWhere(user);

	const invoice = await Invoice.findOne({
		attributes: [
// vendorId, customerId, invoiceNumber, invoiceDate, dueDate, currencyCode, subtotal, taxAmount, totalAmount, paidAmount, balanceDue, paymentStatus, status, currentApproverId, invoiceDocumentId, entityId, sourceType, sourceReimbursementRequestId, sourceIntercompanyTransactionId
			'vendorId',
			'customerId',
			'invoiceNumber',
			'invoiceDate',
			'dueDate',
			'currencyCode',
			'subtotal',
			'taxAmount',
			'totalAmount',
			'paidAmount',
			'balanceDue',
			'paymentStatus',
			'status',
			'currentApproverId',
			'invoiceDocumentId',
			'entityId',
			'sourceType',
			'sourceReimbursementRequestId',
			'sourceIntercompanyTransactionId',
		],
		where: {
			invoiceId : params.invoiceId,
			...where,
		},
		
	});

	if (!invoice) {
		throw notFound('Invoice', 'INVALID_INVOICE_ID');
	}

	const invoiceData = invoice.get({ plain: true });
	return convertStringFieldsToNumbers(invoiceData, ['subtotal', 'taxAmount', 'totalAmount', 'paidAmount']) as Invoice;
};

export const updateInvoice = async (params: InvoicePrimaryKeys, payload: UpdateInvoiceInput, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where = buildInvoiceAccessWhere(user);
	const invoice = await Invoice.findOne({
		where: {
			invoiceId : params.invoiceId,
			...where,
		},
		transaction: t,
	});

	if (!invoice) {
		throw notFound('Invoice', 'INVALID_INVOICE_ID');
	}

	if (payload.status && payload.status !== invoice.status) {
		if (!canCreateInvoices(user) && !canReviewInvoice(invoice, user)) {
			throw forbidden('You do not have permission to change invoice status');
		}
	}

	if (!canCreateInvoices(user) && !canReviewInvoice(invoice, user)) {
		throw forbidden('You do not have permission to update invoices');
	}

	await invoice.update({
		...payload,
		balanceDue: payload.balanceDue ?? calculateBalanceDue(payload.totalAmount ?? invoice.totalAmount, payload.paidAmount ?? invoice.paidAmount),
	}, { transaction: t });

	return {
		message: 'Invoice updated successfully',
		data: invoice.get({ plain: true }),
	};
	});
};

export const getInvoice = async (params: InvoicePrimaryKeys, user: AuthenticatedUserContext): Promise<any> => {
	const include: Includeable[] = [];
	const where = buildInvoiceAccessWhere(user);

	const invoice = await Invoice.findOne({
		attributes: [
// vendorId, customerId, invoiceNumber, invoiceDate, dueDate, currencyCode, subtotal, taxAmount, totalAmount, paidAmount, balanceDue, paymentStatus, status, currentApproverId, invoiceDocumentId, entityId, sourceType, sourceReimbursementRequestId, sourceIntercompanyTransactionId, createdAt, updatedAt
			'vendorId',
			[Sequelize.literal('(SELECT vendor_name FROM vendors  WHERE vendors.vendor_id = "Invoice".vendor_id LIMIT 1)'), 'invoicesFromVendorLabel'],
			'customerId',
			[Sequelize.literal('(SELECT customer_name FROM customers  WHERE customers.customer_id = "Invoice".customer_id LIMIT 1)'), 'invoicesToCustomerLabel'],
			'invoiceNumber',
			'invoiceDate',
			'dueDate',
			'currencyCode',
			'subtotal',
			'taxAmount',
			'totalAmount',
			'paidAmount',
			'balanceDue',
			'paymentStatus',
			'status',
			'currentApproverId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "Invoice".current_approver_id LIMIT 1)'), 'invoiceApprovalsAssignedLabel'],
			'invoiceDocumentId',
			[Sequelize.literal('(SELECT file_url FROM invoice_documents  WHERE invoice_documents.document_id = "Invoice".invoice_document_id LIMIT 1)'), 'invoiceRecordsLabel'],
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "Invoice".entity_id LIMIT 1)'), 'invoicesLabel'],
			'sourceType',
			'sourceReimbursementRequestId',
			[Sequelize.literal('(SELECT business_purpose FROM reimbursement_requests WHERE reimbursement_requests.reimbursement_request_id = "Invoice".source_reimbursement_request_id LIMIT 1)'), 'sourceReimbursementRequestLabel'],
			'sourceIntercompanyTransactionId',
			[Sequelize.literal('(SELECT transaction_type FROM intercompany_transactions WHERE intercompany_transactions.transaction_id = "Invoice".source_intercompany_transaction_id LIMIT 1)'), 'sourceIntercompanyTransactionLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Invoice"."invoice_number", 'primaryKeys', json_build_object('invoiceId', "Invoice"."invoice_id"::text))`), '_meta'],
		],
		where: {
			invoiceId : params.invoiceId,
			...where,
		},
		include: [...include],
		
	});

	if (!invoice) {
		throw notFound('Invoice', 'INVALID_INVOICE_ID');
	}

	return {
		data: invoice.get({ plain: true }),
	};
};

export const deleteInvoice = async (params: InvoicePrimaryKeys, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where = buildInvoiceAccessWhere(user);
	const invoice = await Invoice.findOne({
		where: {
			invoiceId : params.invoiceId,
			...where,
		},
		transaction: t,
	});

	if (!invoice) {
		throw notFound('Invoice', 'INVALID_INVOICE_ID');
	}

	if (!isSuperAdmin(user)) {
		throw forbidden('Only Super Admin can delete invoices');
	}

	await invoice.destroy({ transaction: t });

	return { messageCode: 'INVOICE_DELETED_SUCCESSFULLY',  message: 'invoice Deleted Successfully' };
	});
};

export const applyInvoiceWorkflowAction = async (params: InvoicePrimaryKeys, action: InvoiceWorkflowAction, user: AuthenticatedUserContext): Promise<any> => {
	return sequelize.transaction(async (t) => {
		const invoice = await Invoice.findOne({
			where: {
				invoiceId: params.invoiceId,
				...buildInvoiceAccessWhere(user),
			},
			transaction: t,
		});

		if (!invoice) {
			throw notFound('Invoice', 'INVALID_INVOICE_ID');
		}

		if (action === 'submit') {
			if (!canCreateInvoices(user)) {
				throw forbidden('Only finance users can submit invoices');
			}
			if (!['draft', 'returned', 'rejected'].includes(invoice.status)) {
				throw badRequest(`Invoice cannot be submitted from ${invoice.status} status`, 'INVALID_INVOICE_STATUS_TRANSITION');
			}
			await invoice.update({ status: 'submitted' }, { transaction: t });
		} else {
			if (!canReviewInvoice(invoice, user)) {
				throw forbidden('Only the assigned approver, Accounts Manager, or Super Admin can review this invoice');
			}
			if (!['submitted', 'under review'].includes(invoice.status)) {
				throw badRequest(`Invoice cannot be ${action}d from ${invoice.status} status`, 'INVALID_INVOICE_STATUS_TRANSITION');
			}

			const nextStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'returned';
			await invoice.update({ status: nextStatus }, { transaction: t });
		}

		return {
			message: `Invoice ${action}d successfully`,
			data: invoice.get({ plain: true }),
		};
	});
};

export const createSystemInvoiceForReimbursement = async (
	reimbursementRequest: {
		reimbursementRequestId: string;
		expenseDate?: Date;
		currencyCode: string;
		amount: number | string;
		taxAmount: number | string;
		totalAmount: number | string;
		status: string;
		currentApproverId?: string | null;
		entityId: string;
	},
	transaction: Transaction,
) => {
	const totalAmount = Number(reimbursementRequest.totalAmount || 0);
	const invoiceDate = reimbursementRequest.expenseDate ? new Date(reimbursementRequest.expenseDate) : new Date();

	return Invoice.create({
		invoiceNumber: buildSystemInvoiceNumber('REIM', reimbursementRequest.reimbursementRequestId),
		invoiceDate,
		dueDate: addDays(invoiceDate, 30),
		currencyCode: reimbursementRequest.currencyCode || 'USD',
		subtotal: Number(reimbursementRequest.amount || 0),
		taxAmount: Number(reimbursementRequest.taxAmount || 0),
		totalAmount,
		paidAmount: 0,
		balanceDue: calculateBalanceDue(totalAmount, 0),
		paymentStatus: 'unpaid',
		status: reimbursementRequest.status === 'draft' ? 'draft' : 'submitted',
		currentApproverId: reimbursementRequest.currentApproverId ?? null,
		entityId: reimbursementRequest.entityId,
		sourceType: 'reimbursement',
		sourceReimbursementRequestId: reimbursementRequest.reimbursementRequestId,
		sourceIntercompanyTransactionId: null,
	}, { transaction });
};

export const createSystemInvoiceForIntercompany = async (
	intercompanyTransaction: {
		transactionId: string;
		transactionDate?: Date;
		currencyCode: string;
		amount: number | string;
		taxAmount: number | string;
		status: string;
		currentApproverId?: string | null;
		sourceEntityId: string;
	},
	transaction: Transaction,
) => {
	const subtotal = Number(intercompanyTransaction.amount || 0);
	const taxAmount = Number(intercompanyTransaction.taxAmount || 0);
	const totalAmount = subtotal + taxAmount;
	const invoiceDate = intercompanyTransaction.transactionDate ? new Date(intercompanyTransaction.transactionDate) : new Date();

	return Invoice.create({
		invoiceNumber: buildSystemInvoiceNumber('IC', intercompanyTransaction.transactionId),
		invoiceDate,
		dueDate: addDays(invoiceDate, 30),
		currencyCode: intercompanyTransaction.currencyCode || 'USD',
		subtotal,
		taxAmount,
		totalAmount,
		paidAmount: 0,
		balanceDue: calculateBalanceDue(totalAmount, 0),
		paymentStatus: 'unpaid',
		status: intercompanyTransaction.status === 'draft' ? 'draft' : 'submitted',
		currentApproverId: intercompanyTransaction.currentApproverId ?? null,
		entityId: intercompanyTransaction.sourceEntityId,
		sourceType: 'intercompany',
		sourceReimbursementRequestId: null,
		sourceIntercompanyTransactionId: intercompanyTransaction.transactionId,
	}, { transaction });
};
