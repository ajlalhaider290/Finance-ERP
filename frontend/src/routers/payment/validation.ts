import { z } from "zod";

export const paymentCreateSchema = z.object({
	paymentDate: z.date({error: "Payment Date is required"}),
	amount: z.number({error: "Amount is required"}),
	currencyCode: z.string({error: "Currency Code is required"}),
	paymentMethod: z.enum(["bank_transfer", "credit_card", "check", "cash"]),
	status: z.enum(["pending", "completed", "failed", "cancelled"]),
	paidBy: z.uuid("Invalid UUID format").nullish(),
	entityId: z.uuid("Invalid UUID format"),
});


export const paymentUpdateSchema = paymentCreateSchema;


