import { z } from "zod";

export const journalEntryLineCreateSchema = z.object({
	journalEntryId: z.uuid("Invalid UUID format"),
	debitAmount: z.number({error: "Debit Amount is required"}),
	creditAmount: z.number({error: "Credit Amount is required"}),
	description: z.string().nullish().or(z.literal('')),
});


export const journalEntryLineUpdateSchema = journalEntryLineCreateSchema;


