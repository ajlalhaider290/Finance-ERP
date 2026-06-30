import { journalEntryLineCreateSchema, journalEntryLineUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type JournalEntryLineCreate = z.infer<typeof journalEntryLineCreateSchema>;
export type JournalEntryLineUpdate = z.infer<typeof journalEntryLineUpdateSchema>;
export type JournalEntryLinePrimaryKeys = {
	lineId: string;
}


export type JournalEntryLine = JournalEntryLinePrimaryKeys & {
	journalEntryId: string;
	debitAmount: number;
	creditAmount: number;
	description?: string | null;
	createdAt: Date;
	updatedAt: Date;
}


export type JournalEntryLineIndex = Omit<JournalEntryLine, 'lineId'> & {
	entryLinesLabel: string;
	_meta: ItemMeta<JournalEntryLinePrimaryKeys>;
}

export type JournalEntryLinePager = {
	data: JournalEntryLineIndex[];
	meta: Pager;
}

export type JournalEntryLineQueryParams = {
	page?: number;
	pageSize?: number;
}

export type JournalEntryLineDetail = Omit<JournalEntryLine, 'lineId'> & {
	entryLinesLabel: string;
	_meta: ItemMeta<JournalEntryLinePrimaryKeys>;
}

