import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { Invoice } from '../../models/invoice';
import { Vendor } from '../../models/vendor';
import { Customer } from '../../models/customer';
import { User } from '../../models/user';
import { InvoiceDocument } from '../../models/invoice-document';
import { CompanyEntity } from '../../models/company-entity';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { InvoicePrimaryKeys, CreateInvoiceInput, UpdateInvoiceInput, QueryInvoiceInput } from './types';

export const fetchInvoiceList = async (params: QueryInvoiceInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await Invoice.findAndCountAll({
		attributes: [
// vendorId, customerId, invoiceNumber, invoiceDate, dueDate, currencyCode, subtotal, taxAmount, totalAmount, paidAmount, balanceDue, paymentStatus, status, currentApproverId, invoiceDocumentId, entityId, createdAt, updatedAt
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
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Invoice"."invoice_number", 'primaryKeys', json_build_object('invoiceId', "Invoice"."invoice_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectInvoice = async () => {

	const results = await Invoice.findAll({
		attributes: [
			['invoice_id', 'value'],
			['invoice_number', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addInvoice = async (payload: CreateInvoiceInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const invoiceDefaultPayload = {
			invoiceDate: payload.invoiceDate ?? new Date(),
			dueDate: payload.dueDate ?? new Date(),
			currencyCode: payload.currencyCode ?? "USD",
			subtotal: payload.subtotal ?? 0,
			taxAmount: payload.taxAmount ?? 0,
			totalAmount: payload.totalAmount ?? 0,
			paidAmount: payload.paidAmount ?? 0,
			balanceDue: payload.balanceDue ?? "0.00",
			paymentStatus: payload.paymentStatus ?? "unpaid",
			status: payload.status ?? "draft"
	};
	const invoice = await Invoice.create({...payload, ...invoiceDefaultPayload}, { transaction: t });

	return invoice.get({ plain: true });
	});
};

export const editInvoice = async (params: InvoicePrimaryKeys): Promise<Invoice> => {
	// Initialize filters and include relationships
	const where: WhereOptions<Invoice> & Record<symbol, unknown> = {};

	const invoice = await Invoice.findOne({
		attributes: [
// vendorId, customerId, invoiceNumber, invoiceDate, dueDate, currencyCode, subtotal, taxAmount, totalAmount, paidAmount, balanceDue, paymentStatus, status, currentApproverId, invoiceDocumentId, entityId
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

export const updateInvoice = async (params: InvoicePrimaryKeys, payload: UpdateInvoiceInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<Invoice> & Record<symbol, unknown> = {};
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

	await invoice.update(payload, { transaction: t });

	return {
		message: 'Invoice updated successfully',
		data: invoice.get({ plain: true }),
	};
	});
};

export const getInvoice = async (params: InvoicePrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const invoice = await Invoice.findOne({
		attributes: [
// vendorId, customerId, invoiceNumber, invoiceDate, dueDate, currencyCode, subtotal, taxAmount, totalAmount, paidAmount, balanceDue, paymentStatus, status, currentApproverId, invoiceDocumentId, entityId, createdAt, updatedAt
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
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "Invoice"."invoice_number", 'primaryKeys', json_build_object('invoiceId', "Invoice"."invoice_id"::text))`), '_meta'],
		],
		where: {
			invoiceId : params.invoiceId,
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

export const deleteInvoice = async (params: InvoicePrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<Invoice> & Record<symbol, unknown> = {};
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

	await invoice.destroy({ transaction: t });

	return { messageCode: 'INVOICE_DELETED_SUCCESSFULLY',  message: 'invoice Deleted Successfully' };
	});
};

