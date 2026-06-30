import { Op, Sequelize, fn, BaseError, WhereOptions, Order, Includeable } from 'sequelize';
import { sequelize } from '../../config/db';
import { JournalEntry } from '../../models/journal-entry';
import { CompanyEntity } from '../../models/company-entity';
import { User } from '../../models/user';
import { AppError, notFound, badRequest, conflict } from '../../errors';


import { JournalEntryPrimaryKeys, CreateJournalEntryInput, UpdateJournalEntryInput, QueryJournalEntryInput } from './types';

export const fetchJournalEntryList = async (params: QueryJournalEntryInput) => {
	const pageSize = Math.min(params.pageSize || 50, 100);
	const curPage = params.page || 0;

	const { count, rows } = await JournalEntry.findAndCountAll({
		attributes: [
// entryDate, description, sourceDocumentType, sourceDocumentId, entityId, postedById, postedAt, status, createdAt, updatedAt
			'entryDate',
			'description',
			'sourceDocumentType',
			'sourceDocumentId',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "JournalEntry".entity_id LIMIT 1)'), 'journalEntriesLabel'],
			'postedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "JournalEntry".posted_by LIMIT 1)'), 'journalEntriesPostedLabel'],
			'postedAt',
			'status',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "JournalEntry"."description", 'primaryKeys', json_build_object('journalEntryId', "JournalEntry"."journal_entry_id"::text))`), '_meta'],
		],
		offset: Number(curPage) * Number(pageSize),
		limit: Number(pageSize),
		
	});

	const plainRows = rows.map((row) => row.get({ plain: true }));
	return {data: plainRows, meta: { total: count, page: curPage, pageSize } };
};

export const selectJournalEntry = async () => {

	const results = await JournalEntry.findAll({
		attributes: [
			['journal_entry_id', 'value'],
			['description', 'label'],
		],
	});

	const plainRows = results.map((item) => item.get({ plain: true }));
	return plainRows;
};

export const addJournalEntry = async (payload: CreateJournalEntryInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	// Prepare payload data and add properties

	const journalEntryDefaultPayload = {
			entryDate: payload.entryDate ?? new Date(),
			postedAt: payload.postedAt ?? new Date(),
			status: payload.status ?? "draft"
	};
	const journalEntry = await JournalEntry.create({...payload, ...journalEntryDefaultPayload}, { transaction: t });

	return journalEntry.get({ plain: true });
	});
};

export const editJournalEntry = async (params: JournalEntryPrimaryKeys): Promise<JournalEntry> => {
	// Initialize filters and include relationships
	const where: WhereOptions<JournalEntry> & Record<symbol, unknown> = {};

	const journalEntry = await JournalEntry.findOne({
		attributes: [
// entryDate, description, sourceDocumentType, sourceDocumentId, entityId, postedById, postedAt, status
			'entryDate',
			'description',
			'sourceDocumentType',
			'sourceDocumentId',
			'entityId',
			'postedBy',
			'postedAt',
			'status',
		],
		where: {
			journalEntryId : params.journalEntryId,
			...where,
		},
		
	});

	if (!journalEntry) {
		throw notFound('JournalEntry', 'INVALID_JOURNAL_ENTRY_ID');
	}

	return journalEntry.get({ plain: true }) as JournalEntry;
};

export const updateJournalEntry = async (params: JournalEntryPrimaryKeys, payload: UpdateJournalEntryInput): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<JournalEntry> & Record<symbol, unknown> = {};
	const journalEntry = await JournalEntry.findOne({
		where: {
			journalEntryId : params.journalEntryId,
			...where,
		},
		transaction: t,
	});

	if (!journalEntry) {
		throw notFound('JournalEntry', 'INVALID_JOURNAL_ENTRY_ID');
	}

	await journalEntry.update(payload, { transaction: t });

	return {
		message: 'JournalEntry updated successfully',
		data: journalEntry.get({ plain: true }),
	};
	});
};

export const getJournalEntry = async (params: JournalEntryPrimaryKeys): Promise<any> => {
	const include: Includeable[] = [];

	const journalEntry = await JournalEntry.findOne({
		attributes: [
// entryDate, description, sourceDocumentType, sourceDocumentId, entityId, postedById, postedAt, status, createdAt, updatedAt
			'entryDate',
			'description',
			'sourceDocumentType',
			'sourceDocumentId',
			'entityId',
			[Sequelize.literal('(SELECT entity_name FROM company_entities  WHERE company_entities.entity_id = "JournalEntry".entity_id LIMIT 1)'), 'journalEntriesLabel'],
			'postedBy',
			[Sequelize.literal('(SELECT email FROM users  WHERE users.user_id = "JournalEntry".posted_by LIMIT 1)'), 'journalEntriesPostedLabel'],
			'postedAt',
			'status',
			'createdAt',
			'updatedAt',
			[Sequelize.literal(`json_build_object('label', "JournalEntry"."description", 'primaryKeys', json_build_object('journalEntryId', "JournalEntry"."journal_entry_id"::text))`), '_meta'],
		],
		where: {
			journalEntryId : params.journalEntryId,
		},
		include: [...include],
		
	});

	if (!journalEntry) {
		throw notFound('JournalEntry', 'INVALID_JOURNAL_ENTRY_ID');
	}

	return {
		data: journalEntry.get({ plain: true }),
	};
};

export const deleteJournalEntry = async (params: JournalEntryPrimaryKeys): Promise<any> => {
	return sequelize.transaction(async (t) => {
	const where: WhereOptions<JournalEntry> & Record<symbol, unknown> = {};
	const journalEntry = await JournalEntry.findOne({
		where: {
			journalEntryId : params.journalEntryId,
			...where,
		},
		transaction: t,
	});

	if (!journalEntry) {
		throw notFound('JournalEntry', 'INVALID_JOURNAL_ENTRY_ID');
	}

	await journalEntry.destroy({ transaction: t });

	return { messageCode: 'JOURNAL_ENTRY_DELETED_SUCCESSFULLY',  message: 'journalEntry Deleted Successfully' };
	});
};

