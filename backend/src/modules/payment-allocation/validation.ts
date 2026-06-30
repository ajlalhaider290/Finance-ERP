import { z } from "zod";

export const paymentAllocationQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const paymentAllocationParamValidator = z.object({
	allocationId: z.uuid("Invalid UUID format"),
});


const _paymentAllocationBaseSchema = z.object({
	paymentId: z.uuid("Invalid UUID format"),
	allocatedToType: z.enum(["invoice", "reimbursement", "intercompany_transaction"]),
	allocatedToId: z.string({error: "Allocated To Id is required"}),
	allocatedAmount: z.coerce.number({error: "Allocated Amount is required"}),
});

export const createPaymentAllocationPayloadValidator = _paymentAllocationBaseSchema;

export const updatePaymentAllocationPayloadValidator = _paymentAllocationBaseSchema;


