export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface TaxCodePrimaryKeys {
	taxCodeId: string;
}
export interface CreateTaxCodeInput {
	taxCodeName: string;
	rate: number;
	description?: string | null;
	entityId: string;
	isActive: boolean;
}

export type UpdateTaxCodeInput = CreateTaxCodeInput;

export interface QueryTaxCodeInput {
	page? : number;
	pageSize? : number;

}
