export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface CustomerPrimaryKeys {
	customerId: string;
}
export interface CreateCustomerInput {
	customerName: string;
	contactEmail?: string | null;
	contactPhone?: string | null;
	address?: string | null;
	entityId: string;
}

export type UpdateCustomerInput = CreateCustomerInput;

export interface QueryCustomerInput {
	page? : number;
	pageSize? : number;

}
