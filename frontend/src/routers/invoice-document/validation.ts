import { z } from "zod";
import { inputFileSchema } from '@/util/inputFileSchema';

export const invoiceDocumentCreateSchema = z.object({
	fileUrl: z.string({error: "File Url is required"}),
	fileName: z.string({error: "File Name is required"}),
	uploadedBy: z.uuid("Invalid UUID format"),
});


export const invoiceDocumentUpdateSchema = invoiceDocumentCreateSchema;


export const fileUrlFileSchema = inputFileSchema({
	maxBytes: 5 * 1024 * 1024, // 5 MB
	mimes: ['application/pdf', 'image/jpeg', 'image/png'],
	exts: ['pdf', 'jpg', 'jpeg', 'png'],
});



