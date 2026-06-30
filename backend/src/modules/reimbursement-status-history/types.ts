export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface ReimbursementStatusHistoryPrimaryKeys {
	statusHistoryId: string;
}
export interface CreateReimbursementStatusHistoryInput {
	reimbursementRequestId: string;
	oldStatus?: string | null;
	newStatus: string;
	changedBy: string;
	userComment?: string | null;
}

export type UpdateReimbursementStatusHistoryInput = CreateReimbursementStatusHistoryInput;

export interface QueryReimbursementStatusHistoryInput {
	page? : number;
	pageSize? : number;

}
