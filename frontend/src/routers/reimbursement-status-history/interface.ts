import { reimbursementStatusHistoryCreateSchema, reimbursementStatusHistoryUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type ReimbursementStatusHistoryCreate = z.infer<typeof reimbursementStatusHistoryCreateSchema>;
export type ReimbursementStatusHistoryUpdate = z.infer<typeof reimbursementStatusHistoryUpdateSchema>;
export type ReimbursementStatusHistoryPrimaryKeys = {
	statusHistoryId: string;
}


export type ReimbursementStatusHistory = ReimbursementStatusHistoryPrimaryKeys & {
	reimbursementRequestId: string;
	oldStatus?: string | null;
	newStatus: string;
	changedBy: string;
	changeDate: Date;
	userComment?: string | null;
}


export type ReimbursementStatusHistoryIndex = Omit<ReimbursementStatusHistory, 'statusHistoryId'> & {
	statusHistoryLabel: string;
	statusChangesMadeLabel: string;
	_meta: ItemMeta<ReimbursementStatusHistoryPrimaryKeys>;
}

export type ReimbursementStatusHistoryPager = {
	data: ReimbursementStatusHistoryIndex[];
	meta: Pager;
}

export type ReimbursementStatusHistoryQueryParams = {
	page?: number;
	pageSize?: number;
}

export type ReimbursementStatusHistoryDetail = Omit<ReimbursementStatusHistory, 'statusHistoryId'> & {
	statusHistoryLabel: string;
	statusChangesMadeLabel: string;
	_meta: ItemMeta<ReimbursementStatusHistoryPrimaryKeys>;
}

