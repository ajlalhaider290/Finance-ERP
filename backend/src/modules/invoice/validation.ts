import { z } from "zod";
import { Op } from "sequelize";
import { Invoice } from "../../models/invoice";

export const invoiceQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const invoiceParamValidator = z.object({
	invoiceId: z.uuid("Invalid UUID format"),
});


const _invoiceBaseSchema = z.object({
	vendorId: z.uuid("Invalid UUID format").nullable().optional(),
	customerId: z.uuid("Invalid UUID format").nullable().optional(),
	invoiceNumber: z.string({error: "Invoice Number is required"}),
	invoiceDate: z.coerce.date({error: "Invoice Date is required"}),
	dueDate: z.coerce.date({error: "Due Date is required"}),
	currencyCode: z.string({error: "Currency Code is required"}),
	subtotal: z.coerce.number({error: "Subtotal is required"}),
	taxAmount: z.coerce.number({error: "Tax Amount is required"}),
	totalAmount: z.coerce.number({error: "Total Amount is required"}),
	paidAmount: z.coerce.number({error: "Paid Amount is required"}),
	balanceDue: z.string({error: "Balance Due is required"}),
	paymentStatus: z.enum(["unpaid", "partially paid", "paid", "overdue", "cancelled"]),
	status: z.enum(["draft", "submitted", "under review", "approved", "rejected", "returned", "paid", "cancelled"]),
	currentApproverId: z.uuid("Invalid UUID format").nullable().optional(),
	invoiceDocumentId: z.uuid("Invalid UUID format").nullable().optional(),
	entityId: z.uuid("Invalid UUID format"),
	sourceType: z.enum(["manual", "reimbursement", "intercompany"]).nullable().optional(),
	sourceReimbursementRequestId: z.uuid("Invalid UUID format").nullable().optional(),
	sourceIntercompanyTransactionId: z.uuid("Invalid UUID format").nullable().optional(),
});

export const createInvoicePayloadValidator = _invoiceBaseSchema.refine(async (data) => {
		
  const existingInvoice = await Invoice.findOne({
    where: {
    	invoiceNumber: data.invoiceNumber
    },
  });
  return !existingInvoice;
}, {
  message: 'This combination of invoiceNumber already exists',
  path: ['invoiceNumber'],
});

export const updateInvoicePayloadValidator = (invoiceId: string) => _invoiceBaseSchema.refine(async (data) => {
		
    const whereClauseInvoice: any = {
        invoiceNumber: data.invoiceNumber
    };

    if (invoiceId) {
		whereClauseInvoice.invoiceId = { [Op.ne]: invoiceId}
    }

    const existingInvoice = await Invoice.findOne({
      where: whereClauseInvoice,
    });
    return !existingInvoice;
  }, {
    message: 'This combination of invoiceNumber already exists',
    path: ['invoiceNumber'],
  });

