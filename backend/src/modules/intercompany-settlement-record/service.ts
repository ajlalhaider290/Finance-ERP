import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { IntercompanySettlementRecord } from '../../models/intercompany-settlement-record';
import { IntercompanyTransaction } from '../../models/intercompany-transaction';
import { User } from '../../models/user';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { IntercompanySettlementRecordPrimaryKeys, CreateIntercompanySettlementRecordInput, UpdateIntercompanySettlementRecordInput, QueryIntercompanySettlementRecordInput } from './types';

export const fetchIntercompanySettlementRecordList = async (params: QueryIntercompanySettlementRecordInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await IntercompanySettlementRecord.findAndCountAll({
		attributes: [
// transactionId, settlementDate, settlementAmount, currencyCode, status, recordedById, createdAt, updatedAt
			'transactionId',
			[Sequelize.literal('(SELECT currency_code FROM intercompany_transactions  WHERE intercompany_transactions.transaction_id = "IntercompanySettlementRecord".transaction_id LIMIT 1)'), 'settlementRecordsLabel'],
			'settlementDate',
			'settlementAmount',
			'currencyCode',
			'status',
			'recordedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "IntercompanySettlementRecord".recorded_by LIMIT 1)'), 'settlementsRecordedLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "IntercompanySettlementRecord"."currency_code", 'primaryKeys', json_build_object('settlementRecordId', "IntercompanySettlementRecord"."settlement_record_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectIntercompanySettlementRecord = async () => {

	const results = await IntercompanySettlementRecord.findAll({
		attributes: [
			['settlement_record_id', 'value'],
			['currency_code', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addIntercompanySettlementRecord = async (payload: CreateIntercompanySettlementRecordInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const intercompanySettlementRecordDefaultPayload = {
			settlementDate: payload.settlementDate ?? new Date(),
			settlementAmount: payload.settlementAmount ?? 0,
			currencyCode: payload.currencyCode ?? "USD",
			status: payload.status ?? "pending"
	};
	const intercompanySettlementRecord = await IntercompanySettlementRecord.create({...payload, ...intercompanySettlementRecordDefaultPayload}, { transaction: t });

	return intercompanySettlementRecord.get({ plain: true });
	});
};

export const editIntercompanySettlementRecord = async (params: IntercompanySettlementRecordPrimaryKeys): Promise<IntercompanySettlementRecord> => {
	// Initialize filters and include relationships
	const where: WhereOptions<IntercompanySettlementRecord> & Record<symbol, unknown> = {};

	const intercompanySettlementRecord = await IntercompanySettlementRecord.findOne({
		attributes: [
// transactionId, settlementDate, settlementAmount, currencyCode, status, recordedById
			'transactionId',
			'settlementDate',
			'settlementAmount',
			'currencyCode',
			'status',
			'recordedBy',
		],
		where: {
			settlementRecordId : params.settlementRecordId,
			...where,
		},
		
	});

	if (!intercompanySettlementRecord) {
		throw notFound('IntercompanySettlementRecord', 'INVALID_INTERCOMPANY_SETTLEMENT_RECORD_ID');
	}

	const intercompanySettlementRecordData = intercompanySettlementRecord.get({ plain: true });
	return convertStringFieldsToNumbers(intercompanySettlementRecordData, ['settlementAmount']) as IntercompanySettlementRecord;
};

export const updateIntercompanySettlementRecord = async (params: IntercompanySettlementRecordPrimaryKeys, payload: UpdateIntercompanySettlementRecordInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<IntercompanySettlementRecord> & Record<symbol, unknown> = {};
	const intercompanySettlementRecord = await IntercompanySettlementRecord.findOne({
		where: {
			settlementRecordId : params.settlementRecordId,
			...where,
		},
		transaction: t,
	});

	if (!intercompanySettlementRecord) {
		throw notFound('IntercompanySettlementRecord', 'INVALID_INTERCOMPANY_SETTLEMENT_RECORD_ID');
	}

	await intercompanySettlementRecord.update(payload, { transaction: t });

	return {
		message: 'IntercompanySettlementRecord updated successfully',
		data: intercompanySettlementRecord.get({ plain: true }),
	};
	});
};

export const getIntercompanySettlementRecord = async (params: IntercompanySettlementRecordPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const intercompanySettlementRecord = await IntercompanySettlementRecord.findOne({
		attributes: [
// transactionId, settlementDate, settlementAmount, currencyCode, status, recordedById, createdAt, updatedAt
			'transactionId',
			[Sequelize.literal('(SELECT currency_code FROM intercompany_transactions  WHERE intercompany_transactions.transaction_id = "IntercompanySettlementRecord".transaction_id LIMIT 1)'), 'settlementRecordsLabel'],
			'settlementDate',
			'settlementAmount',
			'currencyCode',
			'status',
			'recordedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "IntercompanySettlementRecord".recorded_by LIMIT 1)'), 'settlementsRecordedLabel'],
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "IntercompanySettlementRecord"."currency_code", 'primaryKeys', json_build_object('settlementRecordId', "IntercompanySettlementRecord"."settlement_record_id"::text))`), '_meta'],
		],
		where: {
			settlementRecordId : params.settlementRecordId,
		},
		include: [...include],
		
	});

	if (!intercompanySettlementRecord) {
		throw notFound('IntercompanySettlementRecord', 'INVALID_INTERCOMPANY_SETTLEMENT_RECORD_ID');
	}

	return {
		data: intercompanySettlementRecord.get({ plain: true }),
	};
};

export const deleteIntercompanySettlementRecord = async (params: IntercompanySettlementRecordPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<IntercompanySettlementRecord> & Record<symbol, unknown> = {};
	const intercompanySettlementRecord = await IntercompanySettlementRecord.findOne({
		where: {
			settlementRecordId : params.settlementRecordId,
			...where,
		},
		transaction: t,
	});

	if (!intercompanySettlementRecord) {
		throw notFound('IntercompanySettlementRecord', 'INVALID_INTERCOMPANY_SETTLEMENT_RECORD_ID');
	}

	await intercompanySettlementRecord.destroy({ transaction: t });

	return { messageCode: 'INTERCOMPANY_SETTLEMENT_RECORD_DELETED_SUCCESSFULLY',  message: 'intercompanySettlementRecord Deleted Successfully' };
	});
};

