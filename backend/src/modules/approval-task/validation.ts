import { z } from "zod";

export const approvalTaskQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const approvalTaskParamValidator = z.object({
	taskId: z.uuid("Invalid UUID format"),
});


const _approvalTaskBaseSchema = z.object({
	documentType: z.enum(["reimbursement", "invoice", "intercompany_transaction"]),
	documentId: z.string({error: "Document Id is required"}),
	assignedToUserId: z.uuid("Invalid UUID format").nullable().optional(),
	assignedToRole: z.string().nullable().optional().or(z.literal('')),
	status: z.enum(["pending", "approved", "rejected", "returned", "delegated"]),
	userComment: z.string().nullable().optional().or(z.literal('')),
	actionedBy: z.uuid("Invalid UUID format").nullable().optional(),
	actionedAt: z.coerce.date().nullable().optional(),
});

export const createApprovalTaskPayloadValidator = _approvalTaskBaseSchema;

export const updateApprovalTaskPayloadValidator = _approvalTaskBaseSchema;


