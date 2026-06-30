import { z } from "zod";
import { inputFileSchema } from '../../util/fileValidation';

export const invoiceDocumentQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const invoiceDocumentParamValidator = z.object({
	documentId: z.uuid("Invalid UUID format"),
});


const _invoiceDocumentBaseSchema = z.object({
	fileUrl: z.string({error: "File Url is required"}),
	fileName: z.string({error: "File Name is required"}),
	uploadedBy: z.uuid("Invalid UUID format"),
});

export const createInvoiceDocumentPayloadValidator = _invoiceDocumentBaseSchema;

export const updateInvoiceDocumentPayloadValidator = _invoiceDocumentBaseSchema;


export const fileUrlFileSchema = inputFileSchema({
	maxBytes: 5 * 1024 * 1024, // 5 MB
	mimes: ['application/pdf', 'image/jpeg', 'image/png'],
	exts: ['pdf', 'jpg', 'jpeg', 'png'],
});


export const invoiceDocumentUploadValidator = {
	fileUrl: fileUrlFileSchema,
};


export const invoiceDocumentRemoveUploadBodyValidator = z.object({
	property: z.enum(['fileUrl'] as const),
});


