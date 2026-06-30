import { journalEntryCreateSchema, journalEntryUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type JournalEntryCreate = z.infer<typeof journalEntryCreateSchema>;
export type JournalEntryUpdate = z.infer<typeof journalEntryUpdateSchema>;
export type JournalEntryPrimaryKeys = {
	journalEntryId: string;
}


export type JournalEntry = JournalEntryPrimaryKeys & {
	entryDate: Date;
	description: string;
	sourceDocumentType?: string | null;
	sourceDocumentId?: string | null;
	entityId: string;
	postedBy?: string | null;
	postedAt?: Date | null;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}


export type JournalEntryIndex = Omit<JournalEntry, 'journalEntryId'> & {
	journalEntriesLabel: string;
	journalEntriesPostedLabel: string;
	_meta: ItemMeta<JournalEntryPrimaryKeys>;
}

export type JournalEntryPager = {
	data: JournalEntryIndex[];
	meta: Pager;
}

export type JournalEntryQueryParams = {
	page?: number;
	pageSize?: number;
}

export type JournalEntryDetail = Omit<JournalEntry, 'journalEntryId'> & {
	journalEntriesLabel: string;
	journalEntriesPostedLabel: string;
	_meta: ItemMeta<JournalEntryPrimaryKeys>;
}

