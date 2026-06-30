import { z } from "zod";

export const intercompanySettlementRecordCreateSchema = z.object({
	transactionId: z.uuid("Invalid UUID format"),
	settlementDate: z.date({error: "Settlement Date is required"}),
	settlementAmount: z.number({error: "Settlement Amount is required"}),
	currencyCode: z.string({error: "Currency Code is required"}),
	status: z.enum(["pending", "completed", "cancelled"]),
	recordedBy: z.uuid("Invalid UUID format"),
});


export const intercompanySettlementRecordUpdateSchema = intercompanySettlementRecordCreateSchema;


