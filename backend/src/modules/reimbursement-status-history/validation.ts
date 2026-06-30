import { z } from "zod";

export const reimbursementStatusHistoryQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const reimbursementStatusHistoryParamValidator = z.object({
	statusHistoryId: z.uuid("Invalid UUID format"),
});


const _reimbursementStatusHistoryBaseSchema = z.object({
	reimbursementRequestId: z.uuid("Invalid UUID format"),
	oldStatus: z.string().nullable().optional().or(z.literal('')),
	newStatus: z.string({error: "New Status is required"}),
	changedBy: z.uuid("Invalid UUID format"),
	userComment: z.string().nullable().optional().or(z.literal('')),
});

export const createReimbursementStatusHistoryPayloadValidator = _reimbursementStatusHistoryBaseSchema;

export const updateReimbursementStatusHistoryPayloadValidator = _reimbursementStatusHistoryBaseSchema;


