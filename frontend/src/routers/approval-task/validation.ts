import { z } from "zod";

export const approvalTaskCreateSchema = z.object({
	documentType: z.enum(["reimbursement", "invoice", "intercompany_transaction"]),
	documentId: z.string({error: "Document Id is required"}),
	assignedToUserId: z.uuid("Invalid UUID format").nullish(),
	assignedToRole: z.string().nullish().or(z.literal('')),
	status: z.enum(["pending", "approved", "rejected", "returned", "delegated"]),
	userComment: z.string().nullish().or(z.literal('')),
	actionedBy: z.uuid("Invalid UUID format").nullish(),
	actionedAt: z.date().nullish(),
});


export const approvalTaskUpdateSchema = approvalTaskCreateSchema;


