import { z } from "zod";

const intercompanyTransactionsLineDetails_019f085327Schema = z.object({
	description: z.string(),
	amount: z.number().int("Must be an integer"),
	accountId: z.string(),
	taxCodeId: z.string(),
});

export const intercompanyTransactionQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const intercompanyTransactionParamValidator = z.object({
	transactionId: z.uuid("Invalid UUID format"),
});


const _intercompanyTransactionBaseSchema = z.object({
	sourceEntityId: z.uuid("Invalid UUID format"),
	targetEntityId: z.uuid("Invalid UUID format"),
	transactionDate: z.coerce.date({error: "Transaction Date is required"}),
	transactionType: z.enum(["billing", "settlement", "loan", "expense_allocation"]),
	currencyCode: z.string({error: "Currency Code is required"}),
	amount: z.coerce.number({error: "Amount is required"}),
	lineDetail: z.array(intercompanyTransactionsLineDetails_019f085327Schema).nullable().optional(),
	taxAmount: z.coerce.number({error: "Tax Amount is required"}),
	status: z.enum(["draft", "submitted", "under review", "approved", "rejected", "posted", "settled", "cancelled"]),
	currentApproverId: z.uuid("Invalid UUID format").nullable().optional(),
});

export const createIntercompanyTransactionPayloadValidator = _intercompanyTransactionBaseSchema;

export const updateIntercompanyTransactionPayloadValidator = _intercompanyTransactionBaseSchema;


