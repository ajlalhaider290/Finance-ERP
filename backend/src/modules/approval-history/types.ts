export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface ApprovalHistoryPrimaryKeys {
	historyId: string;
}
export interface CreateApprovalHistoryInput {
	taskId: string;
	documentType: string;
	documentId: string;
	approverId: string;
	actionValue: string;
	userComment?: string | null;
}

export type UpdateApprovalHistoryInput = CreateApprovalHistoryInput;

export interface QueryApprovalHistoryInput {
	page? : number;
	pageSize? : number;

}
