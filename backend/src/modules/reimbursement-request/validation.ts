import { z } from "zod";

export const reimbursementRequestQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const reimbursementRequestParamValidator = z.object({
	reimbursementRequestId: z.uuid("Invalid UUID format"),
});


const _reimbursementRequestBaseSchema = z.object({
	employeeId: z.uuid("Invalid UUID format"),
	businessPurpose: z.string({error: "Business Purpose is required"}),
	expenseDate: z.coerce.date({error: "Expense Date is required"}),
	categoryId: z.uuid("Invalid UUID format"),
	costCenter: z.string().nullable().optional().or(z.literal('')),
	department: z.string().nullable().optional().or(z.literal('')),
	currencyCode: z.string({error: "Currency Code is required"}),
	amount: z.coerce.number({error: "Amount is required"}),
	taxAmount: z.coerce.number({error: "Tax Amount is required"}),
	totalAmount: z.string({error: "Total Amount is required"}),
	status: z.enum(["draft", "submitted", "under review", "approved", "rejected", "returned", "paid", "cancelled"]),
	currentApproverId: z.uuid("Invalid UUID format").nullable().optional(),
	paidDate: z.coerce.date().nullable().optional(),
	entityId: z.uuid("Invalid UUID format"),
});

export const createReimbursementRequestPayloadValidator = _reimbursementRequestBaseSchema;

export const updateReimbursementRequestPayloadValidator = _reimbursementRequestBaseSchema;


