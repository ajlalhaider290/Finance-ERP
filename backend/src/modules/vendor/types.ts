export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface VendorPrimaryKeys {
	vendorId: string;
}
export interface CreateVendorInput {
	vendorName: string;
	contactEmail?: string | null;
	contactPhone?: string | null;
	address?: string | null;
	entityId: string;
}

export type UpdateVendorInput = CreateVendorInput;

export interface QueryVendorInput {
	page? : number;
	pageSize? : number;

}
