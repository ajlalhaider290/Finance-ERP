import { z } from "zod";

export const reimbursementRequestCreateSchema = z.object({
	employeeId: z.uuid("Invalid UUID format"),
	businessPurpose: z.string({error: "Business Purpose is required"}),
	expenseDate: z.date({error: "Expense Date is required"}),
	categoryId: z.uuid("Invalid UUID format"),
	costCenter: z.string().nullish().or(z.literal('')),
	department: z.string().nullish().or(z.literal('')),
	currencyCode: z.string({error: "Currency Code is required"}),
	amount: z.number({error: "Amount is required"}),
	taxAmount: z.number({error: "Tax Amount is required"}),
	totalAmount: z.string({error: "Total Amount is required"}),
	status: z.enum(["draft", "submitted", "under review", "approved", "rejected", "returned", "paid", "cancelled"]),
	currentApproverId: z.uuid("Invalid UUID format").nullish(),
	paidDate: z.date().nullish(),
	entityId: z.uuid("Invalid UUID format"),
});


export const reimbursementRequestUpdateSchema = reimbursementRequestCreateSchema;


