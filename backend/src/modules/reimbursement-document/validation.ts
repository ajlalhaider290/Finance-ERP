import { z } from "zod";
import { inputFileSchema } from '../../util/fileValidation';

export const reimbursementDocumentQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const reimbursementDocumentParamValidator = z.object({
	documentId: z.uuid("Invalid UUID format"),
});


const _reimbursementDocumentBaseSchema = z.object({
	reimbursementRequestId: z.uuid("Invalid UUID format"),
	documentType: z.enum(["receipt", "invoice", "supporting_file"]),
	fileUrl: z.string({error: "File Url is required"}),
	fileName: z.string({error: "File Name is required"}),
	uploadedBy: z.uuid("Invalid UUID format"),
});

export const createReimbursementDocumentPayloadValidator = _reimbursementDocumentBaseSchema;

export const updateReimbursementDocumentPayloadValidator = _reimbursementDocumentBaseSchema;


export const fileUrlFileSchema = inputFileSchema({
	maxBytes: 5 * 1024 * 1024, // 5 MB
	mimes: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
	exts: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xlsx', 'csv'],
});


export const reimbursementDocumentUploadValidator = {
	fileUrl: fileUrlFileSchema,
};


export const reimbursementDocumentRemoveUploadBodyValidator = z.object({
	property: z.enum(['fileUrl'] as const),
});


