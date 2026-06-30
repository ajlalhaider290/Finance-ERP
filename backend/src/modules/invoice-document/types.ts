export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface InvoiceDocumentPrimaryKeys {
	documentId: string;
}
export interface CreateInvoiceDocumentInput {
	fileUrl: string;
	fileName: string;
	uploadedBy: string;
}

export type UpdateInvoiceDocumentInput = CreateInvoiceDocumentInput;

export interface QueryInvoiceDocumentInput {
	page? : number;
	pageSize? : number;

}
