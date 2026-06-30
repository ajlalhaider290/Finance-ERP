export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface JournalEntryPrimaryKeys {
	journalEntryId: string;
}
export interface CreateJournalEntryInput {
	entryDate: Date;
	description: string;
	sourceDocumentType?: string | null;
	sourceDocumentId?: string | null;
	entityId: string;
	postedBy?: string | null;
	postedAt?: Date | null;
	status: string;
}

export type UpdateJournalEntryInput = CreateJournalEntryInput;

export interface QueryJournalEntryInput {
	page? : number;
	pageSize? : number;

}
