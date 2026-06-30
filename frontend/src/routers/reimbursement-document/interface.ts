import { reimbursementDocumentCreateSchema, reimbursementDocumentUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type ReimbursementDocumentCreate = z.infer<typeof reimbursementDocumentCreateSchema>;
export type ReimbursementDocumentUpdate = z.infer<typeof reimbursementDocumentUpdateSchema>;
export type ReimbursementDocumentPrimaryKeys = {
	documentId: string;
}


export type ReimbursementDocument = ReimbursementDocumentPrimaryKeys & {
	reimbursementRequestId: string;
	documentType: string;
	fileUrl: string;
	fileName: string;
	uploadedBy: string;
	createdAt: Date;
	updatedAt: Date;
}


export type ReimbursementDocumentIndex = Omit<ReimbursementDocument, 'documentId'> & {
	reimbursementDocumentsLabel: string;
	documentsUploadedLabel: string;
	_meta: ItemMeta<ReimbursementDocumentPrimaryKeys>;
}

export type ReimbursementDocumentPager = {
	data: ReimbursementDocumentIndex[];
	meta: Pager;
}

export type ReimbursementDocumentQueryParams = {
	page?: number;
	pageSize?: number;
}

export type ReimbursementDocumentDetail = Omit<ReimbursementDocument, 'documentId'> & {
	reimbursementDocumentsLabel: string;
	documentsUploadedLabel: string;
	_meta: ItemMeta<ReimbursementDocumentPrimaryKeys>;
}

