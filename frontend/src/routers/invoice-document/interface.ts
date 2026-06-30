import { invoiceDocumentCreateSchema, invoiceDocumentUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type InvoiceDocumentCreate = z.infer<typeof invoiceDocumentCreateSchema>;
export type InvoiceDocumentUpdate = z.infer<typeof invoiceDocumentUpdateSchema>;
export type InvoiceDocumentPrimaryKeys = {
	documentId: string;
}


export type InvoiceDocument = InvoiceDocumentPrimaryKeys & {
	fileUrl: string;
	fileName: string;
	uploadedBy: string;
	createdAt: Date;
	updatedAt: Date;
}


export type InvoiceDocumentIndex = Omit<InvoiceDocument, 'documentId'> & {
	invoiceDocumentsUploadedLabel: string;
	_meta: ItemMeta<InvoiceDocumentPrimaryKeys>;
}

export type InvoiceDocumentPager = {
	data: InvoiceDocumentIndex[];
	meta: Pager;
}

export type InvoiceDocumentQueryParams = {
	page?: number;
	pageSize?: number;
}

export type InvoiceDocumentDetail = Omit<InvoiceDocument, 'documentId'> & {
	invoiceDocumentsUploadedLabel: string;
	_meta: ItemMeta<InvoiceDocumentPrimaryKeys>;
}

