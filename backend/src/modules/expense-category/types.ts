export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface ExpenseCategoryPrimaryKeys {
	categoryId: string;
}
export interface CreateExpenseCategoryInput {
	categoryName: string;
	description?: string | null;
	entityId: string;
}

export type UpdateExpenseCategoryInput = CreateExpenseCategoryInput;

export interface QueryExpenseCategoryInput {
	page? : number;
	pageSize? : number;

}
