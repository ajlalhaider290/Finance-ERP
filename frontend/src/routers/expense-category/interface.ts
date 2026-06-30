import { expenseCategoryCreateSchema, expenseCategoryUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type ExpenseCategoryCreate = z.infer<typeof expenseCategoryCreateSchema>;
export type ExpenseCategoryUpdate = z.infer<typeof expenseCategoryUpdateSchema>;
export type ExpenseCategoryPrimaryKeys = {
	categoryId: string;
}


export type ExpenseCategory = ExpenseCategoryPrimaryKeys & {
	categoryName: string;
	description?: string | null;
	entityId: string;
	createdAt: Date;
	updatedAt: Date;
}


export type ExpenseCategoryIndex = Omit<ExpenseCategory, 'categoryId'> & {
	expenseCategoriesLabel: string;
	_meta: ItemMeta<ExpenseCategoryPrimaryKeys>;
}

export type ExpenseCategoryPager = {
	data: ExpenseCategoryIndex[];
	meta: Pager;
}

export type ExpenseCategoryQueryParams = {
	page?: number;
	pageSize?: number;
}

export type ExpenseCategoryDetail = Omit<ExpenseCategory, 'categoryId'> & {
	expenseCategoriesLabel: string;
	_meta: ItemMeta<ExpenseCategoryPrimaryKeys>;
}

