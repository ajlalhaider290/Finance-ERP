import { z } from "zod";

export const invoiceCreateSchema = z.object({
	vendorId: z.uuid("Invalid UUID format").nullish(),
	customerId: z.uuid("Invalid UUID format").nullish(),
	invoiceNumber: z.string({error: "Invoice Number is required"}),
	invoiceDate: z.date({error: "Invoice Date is required"}),
	dueDate: z.date({error: "Due Date is required"}),
	currencyCode: z.string({error: "Currency Code is required"}),
	subtotal: z.number({error: "Subtotal is required"}),
	taxAmount: z.number({error: "Tax Amount is required"}),
	totalAmount: z.number({error: "Total Amount is required"}),
	paidAmount: z.number({error: "Paid Amount is required"}),
	balanceDue: z.string({error: "Balance Due is required"}),
	paymentStatus: z.enum(["unpaid", "partially paid", "paid", "overdue", "cancelled"]),
	status: z.enum(["draft", "submitted", "under review", "approved", "rejected", "returned", "paid", "cancelled"]),
	currentApproverId: z.uuid("Invalid UUID format").nullish(),
	invoiceDocumentId: z.uuid("Invalid UUID format").nullish(),
	entityId: z.uuid("Invalid UUID format"),
});


export const invoiceUpdateSchema = invoiceCreateSchema;


