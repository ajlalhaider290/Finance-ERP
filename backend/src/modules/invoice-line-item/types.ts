export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface InvoiceLineItemPrimaryKeys {
	lineItemId: string;
}
export interface CreateInvoiceLineItemInput {
	invoiceId: string;
	description: string;
	quantity: number;
	unitPrice: number;
	lineTotal: string;
	taxCodeId?: string | null;
}

export type UpdateInvoiceLineItemInput = CreateInvoiceLineItemInput;

export interface QueryInvoiceLineItemInput {
	page? : number;
	pageSize? : number;

}
