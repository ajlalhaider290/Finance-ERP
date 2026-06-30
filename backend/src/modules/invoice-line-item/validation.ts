import { z } from "zod";

export const invoiceLineItemQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const invoiceLineItemParamValidator = z.object({
	lineItemId: z.uuid("Invalid UUID format"),
});


const _invoiceLineItemBaseSchema = z.object({
	invoiceId: z.uuid("Invalid UUID format"),
	description: z.string({error: "Description is required"}),
	quantity: z.coerce.number({error: "Quantity is required"}),
	unitPrice: z.coerce.number({error: "Unit Price is required"}),
	lineTotal: z.string({error: "Line Total is required"}),
	taxCodeId: z.uuid("Invalid UUID format").nullable().optional(),
});

export const createInvoiceLineItemPayloadValidator = _invoiceLineItemBaseSchema;

export const updateInvoiceLineItemPayloadValidator = _invoiceLineItemBaseSchema;


