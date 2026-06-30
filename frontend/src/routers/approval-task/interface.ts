import { approvalTaskCreateSchema, approvalTaskUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type ApprovalTaskCreate = z.infer<typeof approvalTaskCreateSchema>;
export type ApprovalTaskUpdate = z.infer<typeof approvalTaskUpdateSchema>;
export type ApprovalTaskPrimaryKeys = {
	taskId: string;
}


export type ApprovalTask = ApprovalTaskPrimaryKeys & {
	documentType: string;
	documentId: string;
	assignedToUserId?: string | null;
	assignedToRole?: string | null;
	status: string;
	userComment?: string | null;
	actionedBy?: string | null;
	actionedAt?: Date | null;
	createdAt: Date;
	updatedAt: Date;
}


export type ApprovalTaskIndex = Omit<ApprovalTask, 'taskId'> & {
	assignedApprovalTasksLabel: string;
	actionedApprovalTasksLabel: string;
	_meta: ItemMeta<ApprovalTaskPrimaryKeys>;
}

export type ApprovalTaskPager = {
	data: ApprovalTaskIndex[];
	meta: Pager;
}

export type ApprovalTaskQueryParams = {
	page?: number;
	pageSize?: number;
}

export type ApprovalTaskDetail = Omit<ApprovalTask, 'taskId'> & {
	assignedApprovalTasksLabel: string;
	actionedApprovalTasksLabel: string;
	_meta: ItemMeta<ApprovalTaskPrimaryKeys>;
}

