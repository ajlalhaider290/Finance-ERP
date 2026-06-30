export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface ReimbursementDocumentPrimaryKeys {
	documentId: string;
}
export interface CreateReimbursementDocumentInput {
	reimbursementRequestId: string;
	documentType: string;
	fileUrl: string;
	fileName: string;
	uploadedBy: string;
}

export type UpdateReimbursementDocumentInput = CreateReimbursementDocumentInput;

export interface QueryReimbursementDocumentInput {
	page? : number;
	pageSize? : number;

}
