import { z } from "zod";

export const journalEntryCreateSchema = z.object({
	entryDate: z.date({error: "Entry Date is required"}),
	description: z.string({error: "Description is required"}),
	sourceDocumentType: z.enum(["reimbursement", "invoice", "intercompany_transaction", "payment"]).nullish(),
	sourceDocumentId: z.string().nullish().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
	postedBy: z.uuid("Invalid UUID format").nullish(),
	postedAt: z.date().nullish(),
	status: z.enum(["draft", "submitted", "approved", "posted", "cancelled"]),
});


export const journalEntryUpdateSchema = journalEntryCreateSchema;


