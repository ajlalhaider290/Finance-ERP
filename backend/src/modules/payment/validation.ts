import { z } from "zod";

export const paymentQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const paymentParamValidator = z.object({
	paymentId: z.uuid("Invalid UUID format"),
});


const _paymentBaseSchema = z.object({
	paymentDate: z.coerce.date({error: "Payment Date is required"}),
	amount: z.coerce.number({error: "Amount is required"}),
	currencyCode: z.string({error: "Currency Code is required"}),
	paymentMethod: z.enum(["bank_transfer", "credit_card", "check", "cash"]),
	status: z.enum(["pending", "completed", "failed", "cancelled"]),
	paidBy: z.uuid("Invalid UUID format").nullable().optional(),
	entityId: z.uuid("Invalid UUID format"),
});

export const createPaymentPayloadValidator = _paymentBaseSchema;

export const updatePaymentPayloadValidator = _paymentBaseSchema;


