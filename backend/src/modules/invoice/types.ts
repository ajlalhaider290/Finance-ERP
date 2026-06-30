export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface InvoicePrimaryKeys {
	invoiceId: string;
}
export interface CreateInvoiceInput {
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
}

export type UpdateInvoiceInput = CreateInvoiceInput;

export interface QueryInvoiceInput {
	page? : number;
	pageSize? : number;

}
