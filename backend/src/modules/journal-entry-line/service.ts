import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { JournalEntryLine } from '../../models/journal-entry-line';
import { JournalEntry } from '../../models/journal-entry';
import { convertStringFieldsToNumbers } from '../../util/dataTransform';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { JournalEntryLinePrimaryKeys, CreateJournalEntryLineInput, UpdateJournalEntryLineInput, QueryJournalEntryLineInput } from './types';

export const fetchJournalEntryLineList = async (params: QueryJournalEntryLineInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await JournalEntryLine.findAndCountAll({
		attributes: [
// journalEntryId, debitAmount, creditAmount, description, createdAt, updatedAt
			'journalEntryId',
			[Sequelize.literal('(SELECT description FROM journal_entries  WHERE journal_entries.journal_entry_id = "JournalEntryLine".journal_entry_id LIMIT 1)'), 'entryLinesLabel'],
			'debitAmount',
			'creditAmount',
			'description',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "JournalEntryLine"."description", 'primaryKeys', json_build_object('lineId', "JournalEntryLine"."line_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectJournalEntryLine = async () => {

	const results = await JournalEntryLine.findAll({
		attributes: [
			['line_id', 'value'],
			['description', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addJournalEntryLine = async (payload: CreateJournalEntryLineInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const journalEntryLineDefaultPayload = {
			debitAmount: payload.debitAmount ?? 0,
			creditAmount: payload.creditAmount ?? 0
	};
	const journalEntryLine = await JournalEntryLine.create({...payload, ...journalEntryLineDefaultPayload}, { transaction: t });

	return journalEntryLine.get({ plain: true });
	});
};

export const editJournalEntryLine = async (params: JournalEntryLinePrimaryKeys): Promise<JournalEntryLine> => {
	// Initialize filters and include relationships
	const where: WhereOptions<JournalEntryLine> & Record<symbol, unknown> = {};

	const journalEntryLine = await JournalEntryLine.findOne({
		attributes: [
// journalEntryId, debitAmount, creditAmount, description
			'journalEntryId',
			'debitAmount',
			'creditAmount',
			'description',
		],
		where: {
			lineId : params.lineId,
			...where,
		},
		
	});

	if (!journalEntryLine) {
		throw notFound('JournalEntryLine', 'INVALID_JOURNAL_ENTRY_LINE_ID');
	}

	const journalEntryLineData = journalEntryLine.get({ plain: true });
	return convertStringFieldsToNumbers(journalEntryLineData, ['debitAmount', 'creditAmount']) as JournalEntryLine;
};

export const updateJournalEntryLine = async (params: JournalEntryLinePrimaryKeys, payload: UpdateJournalEntryLineInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<JournalEntryLine> & Record<symbol, unknown> = {};
	const journalEntryLine = await JournalEntryLine.findOne({
		where: {
			lineId : params.lineId,
			...where,
		},
		transaction: t,
	});

	if (!journalEntryLine) {
		throw notFound('JournalEntryLine', 'INVALID_JOURNAL_ENTRY_LINE_ID');
	}

	await journalEntryLine.update(payload, { transaction: t });

	return {
		message: 'JournalEntryLine updated successfully',
		data: journalEntryLine.get({ plain: true }),
	};
	});
};

export const getJournalEntryLine = async (params: JournalEntryLinePrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const journalEntryLine = await JournalEntryLine.findOne({
		attributes: [
// journalEntryId, debitAmount, creditAmount, description, createdAt, updatedAt
			'journalEntryId',
			[Sequelize.literal('(SELECT description FROM journal_entries  WHERE journal_entries.journal_entry_id = "JournalEntryLine".journal_entry_id LIMIT 1)'), 'entryLinesLabel'],
			'debitAmount',
			'creditAmount',
			'description',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "JournalEntryLine"."description", 'primaryKeys', json_build_object('lineId', "JournalEntryLine"."line_id"::text))`), '_meta'],
		],
		where: {
			lineId : params.lineId,
		},
		include: [...include],
		
	});

	if (!journalEntryLine) {
		throw notFound('JournalEntryLine', 'INVALID_JOURNAL_ENTRY_LINE_ID');
	}

	return {
		data: journalEntryLine.get({ plain: true }),
	};
};

export const deleteJournalEntryLine = async (params: JournalEntryLinePrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<JournalEntryLine> & Record<symbol, unknown> = {};
	const journalEntryLine = await JournalEntryLine.findOne({
		where: {
			lineId : params.lineId,
			...where,
		},
		transaction: t,
	});

	if (!journalEntryLine) {
		throw notFound('JournalEntryLine', 'INVALID_JOURNAL_ENTRY_LINE_ID');
	}

	await journalEntryLine.destroy({ transaction: t });

	return { messageCode: 'JOURNAL_ENTRY_LINE_DELETED_SUCCESSFULLY',  message: 'journalEntryLine Deleted Successfully' };
	});
};

