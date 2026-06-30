import { reimbursementRequestCreateSchema, reimbursementRequestUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type ReimbursementRequestCreate = z.infer<typeof reimbursementRequestCreateSchema>;
export type ReimbursementRequestUpdate = z.infer<typeof reimbursementRequestUpdateSchema>;
export type ReimbursementRequestPrimaryKeys = {
	reimbursementRequestId: string;
}


export type ReimbursementRequest = ReimbursementRequestPrimaryKeys & {
	employeeId: string;
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
	entityId: string;
	createdAt: Date;
	updatedAt: Date;
}


export type ReimbursementRequestIndex = Omit<ReimbursementRequest, 'reimbursementRequestId'> & {
	employeeLabel: string;
	categoryLabel: string;
	approvalsAssignedLabel: string;
	entityLabel: string;
	_meta: ItemMeta<ReimbursementRequestPrimaryKeys>;
}

export type ReimbursementRequestPager = {
	data: ReimbursementRequestIndex[];
	meta: Pager;
}

export type ReimbursementRequestQueryParams = {
	page?: number;
	pageSize?: number;
}

export type ReimbursementRequestDetail = Omit<ReimbursementRequest, 'reimbursementRequestId'> & {
	employeeLabel: string;
	categoryLabel: string;
	approvalsAssignedLabel: string;
	entityLabel: string;
	_meta: ItemMeta<ReimbursementRequestPrimaryKeys>;
}
