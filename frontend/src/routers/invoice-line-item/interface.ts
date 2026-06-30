import { invoiceLineItemCreateSchema, invoiceLineItemUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type InvoiceLineItemCreate = z.infer<typeof invoiceLineItemCreateSchema>;
export type InvoiceLineItemUpdate = z.infer<typeof invoiceLineItemUpdateSchema>;
export type InvoiceLineItemPrimaryKeys = {
	lineItemId: string;
}


export type InvoiceLineItem = InvoiceLineItemPrimaryKeys & {
	invoiceId: string;
	description: string;
	quantity: number;
	unitPrice: number;
	lineTotal: string;
	taxCodeId?: string | null;
	createdAt: Date;
	updatedAt: Date;
}


export type InvoiceLineItemIndex = Omit<InvoiceLineItem, 'lineItemId'> & {
	lineItemsLabel: string;
	invoiceLineItemsLabel: string;
	_meta: ItemMeta<InvoiceLineItemPrimaryKeys>;
}

export type InvoiceLineItemPager = {
	data: InvoiceLineItemIndex[];
	meta: Pager;
}

export type InvoiceLineItemQueryParams = {
	page?: number;
	pageSize?: number;
}

export type InvoiceLineItemDetail = Omit<InvoiceLineItem, 'lineItemId'> & {
	lineItemsLabel: string;
	invoiceLineItemsLabel: string;
	_meta: ItemMeta<InvoiceLineItemPrimaryKeys>;
}

