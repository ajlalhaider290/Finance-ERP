import { invoiceCreateSchema, invoiceUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type InvoiceCreate = z.infer<typeof invoiceCreateSchema>;
export type InvoiceUpdate = z.infer<typeof invoiceUpdateSchema>;
export type InvoicePrimaryKeys = {
	invoiceId: string;
}


export type Invoice = InvoicePrimaryKeys & {
	vendorId?: string | null;
	customerId?: string | null;
	invoiceNumber: string;
	invoiceDate: Date;
	dueDate: Date;
	currencyCode: string;
	subtotal: number;
	taxAmount: number;
	totalAmount: number;
	paidAmount: number;
	balanceDue: string;
	paymentStatus: string;
	status: string;
	currentApproverId?: string | null;
	invoiceDocumentId?: string | null;
	entityId: string;
	createdAt: Date;
	updatedAt: Date;
}


export type InvoiceIndex = Omit<Invoice, 'invoiceId'> & {
	invoicesFromVendorLabel: string;
	invoicesToCustomerLabel: string;
	invoiceApprovalsAssignedLabel: string;
	invoiceRecordsLabel: string;
	invoicesLabel: string;
	_meta: ItemMeta<InvoicePrimaryKeys>;
}

export type InvoicePager = {
	data: InvoiceIndex[];
	meta: Pager;
}

export type InvoiceQueryParams = {
	page?: number;
	pageSize?: number;
}

export type InvoiceDetail = Omit<Invoice, 'invoiceId'> & {
	invoicesFromVendorLabel: string;
	invoicesToCustomerLabel: string;
	invoiceApprovalsAssignedLabel: string;
	invoiceRecordsLabel: string;
	invoicesLabel: string;
	_meta: ItemMeta<InvoicePrimaryKeys>;
}

