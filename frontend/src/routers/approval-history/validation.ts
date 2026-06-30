import { z } from "zod";

export const approvalHistoryCreateSchema = z.object({
	taskId: z.uuid("Invalid UUID format"),
	documentType: z.enum(["reimbursement", "invoice", "intercompany_transaction"]),
	documentId: z.string({error: "Document Id is required"}),
	approverId: z.uuid("Invalid UUID format"),
	actionValue: z.enum(["approved", "rejected", "returned", "delegated", "commented"]),
	userComment: z.string().nullish().or(z.literal('')),
});


export const approvalHistoryUpdateSchema = approvalHistoryCreateSchema;


