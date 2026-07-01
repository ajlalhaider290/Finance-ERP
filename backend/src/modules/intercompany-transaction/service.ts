import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { IntercompanyTransaction } from '../../models/intercompany-transaction';
import { CompanyEntity } from '../../models/company-entity';
import { User } from '../../models/user';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';
import { createSystemInvoiceForIntercompany } from '../invoice/service';


import { IntercompanyTransactionPrimaryKeys, CreateIntercompanyTransactionInput, UpdateIntercompanyTransactionInput, QueryIntercompanyTransactionInput } from './types';

export const fetchIntercompanyTransactionList = async (params: QueryIntercompanyTransactionInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await IntercompanyTransaction.findAndCountAll({
		attributes: [
// sourceEntityId, targetEntityId, transactionDate, transactionType, currencyCode, amount, lineDetails, taxAmount, status, currentApproverId, createdAt, updatedAt
			'sourceEntityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "IntercompanyTransaction".source_entity_id LIMIT 1)'), 'transactionsFromSourceLabel'],
			'targetEntityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "IntercompanyTransaction".target_entity_id LIMIT 1)'), 'transactionsToTargetLabel'],
			'transactionDate',
			'transactionType',
			'currencyCode',
			'amount',
			'lineDetail',
			'taxAmount',
			'status',
			'currentApproverId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "IntercompanyTransaction".current_approver_id LIMIT 1)'), 'intercompanyApprovalsAssignedLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "IntercompanyTransaction"."currency_code", 'primaryKeys', json_build_object('transactionId', "IntercompanyTransaction"."transaction_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectIntercompanyTransaction = async () => {

	const results = await IntercompanyTransaction.findAll({
		attributes: [
			['transaction_id', 'value'],
			['currency_code', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addIntercompanyTransaction = async (payload: CreateIntercompanyTransactionInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const amount = Number(payload.amount ?? 0);
	const taxAmount = Number(payload.taxAmount ?? 0);
	const intercompanyTransactionDefaultPayload = {
			transactionDate: payload.transactionDate ?? new Date(),
			transactionType: payload.transactionType ?? "billing",
			currencyCode: payload.currencyCode ?? "USD",
			amount,
			lineDetail: payload.lineDetail ?? null,
			taxAmount,
			status: payload.status ?? "draft"
	};
	const intercompanyTransaction = await IntercompanyTransaction.create({...payload, ...intercompanyTransactionDefaultPayload}, { transaction: t });
	const plainIntercompanyTransaction = intercompanyTransaction.get({ plain: true });
	await createSystemInvoiceForIntercompany(plainIntercompanyTransaction, t);

	return {
		...plainIntercompanyTransaction,
		linkedInvoiceCreated: true,
	};
	});
};

export const editIntercompanyTransaction = async (params: IntercompanyTransactionPrimaryKeys): Promise<IntercompanyTransaction> => {
	// Initialize filters and include relationships
	const where: WhereOptions<IntercompanyTransaction> & Record<symbol, unknown> = {};

	const intercompanyTransaction = await IntercompanyTransaction.findOne({
		attributes: [
// sourceEntityId, targetEntityId, transactionDate, transactionType, currencyCode, amount, lineDetails, taxAmount, status, currentApproverId
			'sourceEntityId',
			'targetEntityId',
			'transactionDate',
			'transactionType',
			'currencyCode',
			'amount',
			'lineDetail',
			'taxAmount',
			'status',
			'currentApproverId',
		],
		where: {
			transactionId : params.transactionId,
			...where,
		},
		
	});

	if (!intercompanyTransaction) {
		throw notFound('IntercompanyTransaction', 'INVALID_INTERCOMPANY_TRANSACTION_ID');
	}

	const intercompanyTransactionData = intercompanyTransaction.get({ plain: true });
	return convertStringFieldsToNumbers(intercompanyTransactionData, ['amount', 'taxAmount']) as IntercompanyTransaction;
};

export const updateIntercompanyTransaction = async (params: IntercompanyTransactionPrimaryKeys, payload: UpdateIntercompanyTransactionInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<IntercompanyTransaction> & Record<symbol, unknown> = {};
	const intercompanyTransaction = await IntercompanyTransaction.findOne({
		where: {
			transactionId : params.transactionId,
			...where,
		},
		transaction: t,
	});

	if (!intercompanyTransaction) {
		throw notFound('IntercompanyTransaction', 'INVALID_INTERCOMPANY_TRANSACTION_ID');
	}

	await intercompanyTransaction.update(payload, { transaction: t });

	return {
		message: 'IntercompanyTransaction updated successfully',
		data: intercompanyTransaction.get({ plain: true }),
	};
	});
};

export const getIntercompanyTransaction = async (params: IntercompanyTransactionPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const intercompanyTransaction = await IntercompanyTransaction.findOne({
		attributes: [
// sourceEntityId, targetEntityId, transactionDate, transactionType, currencyCode, amount, lineDetails, taxAmount, status, currentApproverId, createdAt, updatedAt
			'sourceEntityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "IntercompanyTransaction".source_entity_id LIMIT 1)'), 'transactionsFromSourceLabel'],
			'targetEntityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "IntercompanyTransaction".target_entity_id LIMIT 1)'), 'transactionsToTargetLabel'],
			'transactionDate',
			'transactionType',
			'currencyCode',
			'amount',
			'lineDetail',
			'taxAmount',
			'status',
			'currentApproverId',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "IntercompanyTransaction".current_approver_id LIMIT 1)'), 'intercompanyApprovalsAssignedLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "IntercompanyTransaction"."currency_code", 'primaryKeys', json_build_object('transactionId', "IntercompanyTransaction"."transaction_id"::text))`), '_meta'],
		],
		where: {
			transactionId : params.transactionId,
		},
		include: [...include],
		
	});

	if (!intercompanyTransaction) {
		throw notFound('IntercompanyTransaction', 'INVALID_INTERCOMPANY_TRANSACTION_ID');
	}

	return {
		data: intercompanyTransaction.get({ plain: true }),
	};
};

export const deleteIntercompanyTransaction = async (params: IntercompanyTransactionPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<IntercompanyTransaction> & Record<symbol, unknown> = {};
	const intercompanyTransaction = await IntercompanyTransaction.findOne({
		where: {
			transactionId : params.transactionId,
			...where,
		},
		transaction: t,
	});

	if (!intercompanyTransaction) {
		throw notFound('IntercompanyTransaction', 'INVALID_INTERCOMPANY_TRANSACTION_ID');
	}

	await intercompanyTransaction.destroy({ transaction: t });

	return { messageCode: 'INTERCOMPANY_TRANSACTION_DELETED_SUCCESSFULLY',  message: 'intercompanyTransaction Deleted Successfully' };
	});
};
