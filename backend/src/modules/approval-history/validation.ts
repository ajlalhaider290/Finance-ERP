import { z } from "zod";

export const approvalHistoryQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const approvalHistoryParamValidator = z.object({
	historyId: z.uuid("Invalid UUID format"),
});


const _approvalHistoryBaseSchema = z.object({
	taskId: z.uuid("Invalid UUID format"),
	documentType: z.enum(["reimbursement", "invoice", "intercompany_transaction"]),
	documentId: z.string({error: "Document Id is required"}),
	approverId: z.uuid("Invalid UUID format"),
	actionValue: z.enum(["approved", "rejected", "returned", "delegated", "commented"]),
	userComment: z.string().nullable().optional().or(z.literal('')),
});

export const createApprovalHistoryPayloadValidator = _approvalHistoryBaseSchema;

export const updateApprovalHistoryPayloadValidator = _approvalHistoryBaseSchema;


