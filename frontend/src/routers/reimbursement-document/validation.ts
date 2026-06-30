import { z } from "zod";
import { inputFileSchema } from '@/util/inputFileSchema';

export const reimbursementDocumentCreateSchema = z.object({
	reimbursementRequestId: z.uuid("Invalid UUID format"),
	documentType: z.enum(["receipt", "invoice", "supporting_file"]),
	fileUrl: z.string({error: "File Url is required"}),
	fileName: z.string({error: "File Name is required"}),
	uploadedBy: z.uuid("Invalid UUID format"),
});


export const reimbursementDocumentUpdateSchema = reimbursementDocumentCreateSchema;


export const fileUrlFileSchema = inputFileSchema({
	maxBytes: 5 * 1024 * 1024, // 5 MB
	mimes: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
	exts: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xlsx', 'csv'],
});



