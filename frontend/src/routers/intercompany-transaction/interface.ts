import { intercompanyTransactionCreateSchema, intercompanyTransactionUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


interface IIntercompanyTransactionsLineDetails_019f085327 extends Record<string, unknown> {
	description: string;
	amount: number;
	accountId: string;
	taxCodeId: string;
}

export type IntercompanyTransactionCreate = z.infer<typeof intercompanyTransactionCreateSchema>;
export type IntercompanyTransactionUpdate = z.infer<typeof intercompanyTransactionUpdateSchema>;
export type IntercompanyTransactionPrimaryKeys = {
	transactionId: string;
}


export type IntercompanyTransaction = IntercompanyTransactionPrimaryKeys & {
	sourceEntityId: string;
	targetEntityId: string;
	transactionDate: Date;
	transactionType: string;
	currencyCode: string;
	amount: number;
	lineDetail?: IIntercompanyTransactionsLineDetails_019f085327[] | null;
	taxAmount: number;
	status: string;
	currentApproverId?: string | null;
	createdAt: Date;
	updatedAt: Date;
}


export type IntercompanyTransactionIndex = Omit<IntercompanyTransaction, 'transactionId'> & {
	transactionsFromSourceLabel: string;
	transactionsToTargetLabel: string;
	intercompanyApprovalsAssignedLabel: string;
	_meta: ItemMeta<IntercompanyTransactionPrimaryKeys>;
}

export type IntercompanyTransactionPager = {
	data: IntercompanyTransactionIndex[];
	meta: Pager;
}

export type IntercompanyTransactionQueryParams = {
	page?: number;
	pageSize?: number;
}

export type IntercompanyTransactionDetail = Omit<IntercompanyTransaction, 'transactionId'> & {
	transactionsFromSourceLabel: string;
	transactionsToTargetLabel: string;
	intercompanyApprovalsAssignedLabel: string;
	_meta: ItemMeta<IntercompanyTransactionPrimaryKeys>;
}

