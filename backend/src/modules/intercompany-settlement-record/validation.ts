import { z } from "zod";

export const intercompanySettlementRecordQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const intercompanySettlementRecordParamValidator = z.object({
	settlementRecordId: z.uuid("Invalid UUID format"),
});


const _intercompanySettlementRecordBaseSchema = z.object({
	transactionId: z.uuid("Invalid UUID format"),
	settlementDate: z.coerce.date({error: "Settlement Date is required"}),
	settlementAmount: z.coerce.number({error: "Settlement Amount is required"}),
	currencyCode: z.string({error: "Currency Code is required"}),
	status: z.enum(["pending", "completed", "cancelled"]),
	recordedBy: z.uuid("Invalid UUID format"),
});

export const createIntercompanySettlementRecordPayloadValidator = _intercompanySettlementRecordBaseSchema;

export const updateIntercompanySettlementRecordPayloadValidator = _intercompanySettlementRecordBaseSchema;


