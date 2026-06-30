import { z } from "zod";

export const journalEntryQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const journalEntryParamValidator = z.object({
	journalEntryId: z.uuid("Invalid UUID format"),
});


const _journalEntryBaseSchema = z.object({
	entryDate: z.coerce.date({error: "Entry Date is required"}),
	description: z.string({error: "Description is required"}),
	sourceDocumentType: z.enum(["reimbursement", "invoice", "intercompany_transaction", "payment"]).nullable().optional(),
	sourceDocumentId: z.string().nullable().optional().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
	postedBy: z.uuid("Invalid UUID format").nullable().optional(),
	postedAt: z.coerce.date().nullable().optional(),
	status: z.enum(["draft", "submitted", "approved", "posted", "cancelled"]),
});

export const createJournalEntryPayloadValidator = _journalEntryBaseSchema;

export const updateJournalEntryPayloadValidator = _journalEntryBaseSchema;


