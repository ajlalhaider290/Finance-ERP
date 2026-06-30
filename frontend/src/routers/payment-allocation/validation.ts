import { z } from "zod";

export const paymentAllocationCreateSchema = z.object({
	paymentId: z.uuid("Invalid UUID format"),
	allocatedToType: z.enum(["invoice", "reimbursement", "intercompany_transaction"]),
	allocatedToId: z.string({error: "Allocated To Id is required"}),
	allocatedAmount: z.number({error: "Allocated Amount is required"}),
});


export const paymentAllocationUpdateSchema = paymentAllocationCreateSchema;


