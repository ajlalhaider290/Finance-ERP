import { approvalHistoryCreateSchema, approvalHistoryUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type ApprovalHistoryCreate = z.infer<typeof approvalHistoryCreateSchema>;
export type ApprovalHistoryUpdate = z.infer<typeof approvalHistoryUpdateSchema>;
export type ApprovalHistoryPrimaryKeys = {
	historyId: string;
}


export type ApprovalHistory = ApprovalHistoryPrimaryKeys & {
	taskId: string;
	documentType: string;
	documentId: string;
	approverId: string;
	actionValue: string;
	actionDate: Date;
	userComment?: string | null;
}


export type ApprovalHistoryIndex = Omit<ApprovalHistory, 'historyId'> & {
	approvalHistoryLabel: string;
	approvalsMadeLabel: string;
	_meta: ItemMeta<ApprovalHistoryPrimaryKeys>;
}

export type ApprovalHistoryPager = {
	data: ApprovalHistoryIndex[];
	meta: Pager;
}

export type ApprovalHistoryQueryParams = {
	page?: number;
	pageSize?: number;
}

export type ApprovalHistoryDetail = Omit<ApprovalHistory, 'historyId'> & {
	approvalHistoryLabel: string;
	approvalsMadeLabel: string;
	_meta: ItemMeta<ApprovalHistoryPrimaryKeys>;
}

