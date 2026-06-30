export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface CompanyEntityPrimaryKeys {
	entityId: string;
}
export interface CreateCompanyEntityInput {
	entityName: string;
	currencyCode: string;
}

export type UpdateCompanyEntityInput = CreateCompanyEntityInput;

export interface QueryCompanyEntityInput {
	page? : number;
	pageSize? : number;

}
