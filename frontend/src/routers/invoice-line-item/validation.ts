import { z } from "zod";

export const invoiceLineItemCreateSchema = z.object({
	invoiceId: z.uuid("Invalid UUID format"),
	description: z.string({error: "Description is required"}),
	quantity: z.number({error: "Quantity is required"}),
	unitPrice: z.number({error: "Unit Price is required"}),
	lineTotal: z.string({error: "Line Total is required"}),
	taxCodeId: z.uuid("Invalid UUID format").nullish(),
});


export const invoiceLineItemUpdateSchema = invoiceLineItemCreateSchema;


