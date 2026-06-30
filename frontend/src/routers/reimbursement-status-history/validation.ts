import { z } from "zod";

export const reimbursementStatusHistoryCreateSchema = z.object({
	reimbursementRequestId: z.uuid("Invalid UUID format"),
	oldStatus: z.string().nullish().or(z.literal('')),
	newStatus: z.string({error: "New Status is required"}),
	changedBy: z.uuid("Invalid UUID format"),
	userComment: z.string().nullish().or(z.literal('')),
});


export const reimbursementStatusHistoryUpdateSchema = reimbursementStatusHistoryCreateSchema;


