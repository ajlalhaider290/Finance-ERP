import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { InvoiceLineItem } from '../../models/invoice-line-item';
import { Invoice } from '../../models/invoice';
import { TaxCode } from '../../models/tax-code';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { InvoiceLineItemPrimaryKeys, CreateInvoiceLineItemInput, UpdateInvoiceLineItemInput, QueryInvoiceLineItemInput } from './types';

export const fetchInvoiceLineItemList = async (params: QueryInvoiceLineItemInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await InvoiceLineItem.findAndCountAll({
		attributes: [
// invoiceId, description, quantity, unitPrice, lineTotal, taxCodeId, createdAt, updatedAt
			'invoiceId',
			[Sequelize.literal('(SELECT invoice_number FROM invoices  WHERE invoices.invoice_id = "InvoiceLineItem".invoice_id LIMIT 1)'), 'lineItemsLabel'],
			'description',
			'quantity',
			'unitPrice',
			'lineTotal',
			'taxCodeId',
			[Sequelize.literal('(SELECT tax_code_name FROM tax_codes  WHERE tax_codes.tax_code_id = "InvoiceLineItem".tax_code_id LIMIT 1)'), 'invoiceLineItemsLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "InvoiceLineItem"."description", 'primaryKeys', json_build_object('lineItemId', "InvoiceLineItem"."line_item_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectInvoiceLineItem = async () => {

	const results = await InvoiceLineItem.findAll({
		attributes: [
			['line_item_id', 'value'],
			['description', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addInvoiceLineItem = async (payload: CreateInvoiceLineItemInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const invoiceLineItemDefaultPayload = {
			quantity: payload.quantity ?? 1,
			unitPrice: payload.unitPrice ?? 0,
			lineTotal: payload.lineTotal ?? "0.00"
	};
	const invoiceLineItem = await InvoiceLineItem.create({...payload, ...invoiceLineItemDefaultPayload}, { transaction: t });

	return invoiceLineItem.get({ plain: true });
	});
};

export const editInvoiceLineItem = async (params: InvoiceLineItemPrimaryKeys): Promise<InvoiceLineItem> => {
	// Initialize filters and include relationships
	const where: WhereOptions<InvoiceLineItem> & Record<symbol, unknown> = {};

	const invoiceLineItem = await InvoiceLineItem.findOne({
		attributes: [
// invoiceId, description, quantity, unitPrice, lineTotal, taxCodeId
			'invoiceId',
			'description',
			'quantity',
			'unitPrice',
			'lineTotal',
			'taxCodeId',
		],
		where: {
			lineItemId : params.lineItemId,
			...where,
		},
		
	});

	if (!invoiceLineItem) {
		throw notFound('InvoiceLineItem', 'INVALID_INVOICE_LINE_ITEM_ID');
	}

	const invoiceLineItemData = invoiceLineItem.get({ plain: true });
	return convertStringFieldsToNumbers(invoiceLineItemData, ['quantity', 'unitPrice']) as InvoiceLineItem;
};

export const updateInvoiceLineItem = async (params: InvoiceLineItemPrimaryKeys, payload: UpdateInvoiceLineItemInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<InvoiceLineItem> & Record<symbol, unknown> = {};
	const invoiceLineItem = await InvoiceLineItem.findOne({
		where: {
			lineItemId : params.lineItemId,
			...where,
		},
		transaction: t,
	});

	if (!invoiceLineItem) {
		throw notFound('InvoiceLineItem', 'INVALID_INVOICE_LINE_ITEM_ID');
	}

	await invoiceLineItem.update(payload, { transaction: t });

	return {
		message: 'InvoiceLineItem updated successfully',
		data: invoiceLineItem.get({ plain: true }),
	};
	});
};

export const getInvoiceLineItem = async (params: InvoiceLineItemPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const invoiceLineItem = await InvoiceLineItem.findOne({
		attributes: [
// invoiceId, description, quantity, unitPrice, lineTotal, taxCodeId, createdAt, updatedAt
			'invoiceId',
			[Sequelize.literal('(SELECT invoice_number FROM invoices  WHERE invoices.invoice_id = "InvoiceLineItem".invoice_id LIMIT 1)'), 'lineItemsLabel'],
			'description',
			'quantity',
			'unitPrice',
			'lineTotal',
			'taxCodeId',
			[Sequelize.literal('(SELECT tax_code_name FROM tax_codes  WHERE tax_codes.tax_code_id = "InvoiceLineItem".tax_code_id LIMIT 1)'), 'invoiceLineItemsLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "InvoiceLineItem"."description", 'primaryKeys', json_build_object('lineItemId', "InvoiceLineItem"."line_item_id"::text))`), '_meta'],
		],
		where: {
			lineItemId : params.lineItemId,
		},
		include: [...include],
		
	});

	if (!invoiceLineItem) {
		throw notFound('InvoiceLineItem', 'INVALID_INVOICE_LINE_ITEM_ID');
	}

	return {
		data: invoiceLineItem.get({ plain: true }),
	};
};

export const deleteInvoiceLineItem = async (params: InvoiceLineItemPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<InvoiceLineItem> & Record<symbol, unknown> = {};
	const invoiceLineItem = await InvoiceLineItem.findOne({
		where: {
			lineItemId : params.lineItemId,
			...where,
		},
		transaction: t,
	});

	if (!invoiceLineItem) {
		throw notFound('InvoiceLineItem', 'INVALID_INVOICE_LINE_ITEM_ID');
	}

	await invoiceLineItem.destroy({ transaction: t });

	return { messageCode: 'INVOICE_LINE_ITEM_DELETED_SUCCESSFULLY',  message: 'invoiceLineItem Deleted Successfully' };
	});
};

