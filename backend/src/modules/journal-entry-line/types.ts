export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface JournalEntryLinePrimaryKeys {
	lineId: string;
}
export interface CreateJournalEntryLineInput {
	journalEntryId: string;
	debitAmount: number;
	creditAmount: number;
	description?: string | null;
}

export type UpdateJournalEntryLineInput = CreateJournalEntryLineInput;

export interface QueryJournalEntryLineInput {
	page? : number;
	pageSize? : number;

}
