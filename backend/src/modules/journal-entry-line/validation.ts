import { z } from "zod";

export const journalEntryLineQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const journalEntryLineParamValidator = z.object({
	lineId: z.uuid("Invalid UUID format"),
});


const _journalEntryLineBaseSchema = z.object({
	journalEntryId: z.uuid("Invalid UUID format"),
	debitAmount: z.coerce.number({error: "Debit Amount is required"}),
	creditAmount: z.coerce.number({error: "Credit Amount is required"}),
	description: z.string().nullable().optional().or(z.literal('')),
});

export const createJournalEntryLinePayloadValidator = _journalEntryLineBaseSchema;

export const updateJournalEntryLinePayloadValidator = _journalEntryLineBaseSchema;


