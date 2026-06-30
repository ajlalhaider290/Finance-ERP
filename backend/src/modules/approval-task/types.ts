export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface ApprovalTaskPrimaryKeys {
	taskId: string;
}
export interface CreateApprovalTaskInput {
	documentType: string;
	documentId: string;
	assignedToUserId?: string | null;
	assignedToRole?: string | null;
	status: string;
	userComment?: string | null;
	actionedBy?: string | null;
	actionedAt?: Date | null;
}

export type UpdateApprovalTaskInput = CreateApprovalTaskInput;

export interface QueryApprovalTaskInput {
	page? : number;
	pageSize? : number;

}
