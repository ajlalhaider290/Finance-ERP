export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface ReimbursementRequestPrimaryKeys {
	reimbursementRequestId: string;
}
export interface CreateReimbursementRequestInput {
	employeeId?: string | null;
	businessPurpose: string;
	expenseDate: Date;
	categoryId: string;
	costCenter?: string | null;
	department?: string | null;
	currencyCode: string;
	amount: number;
	taxAmount: number;
	totalAmount: string;
	status: string;
	currentApproverId?: string | null;
	paidDate?: Date | null;
	entityId?: string | null;
}

export type UpdateReimbursementRequestInput = CreateReimbursementRequestInput;

export interface QueryReimbursementRequestInput {
	page? : number;
	pageSize? : number;

}
