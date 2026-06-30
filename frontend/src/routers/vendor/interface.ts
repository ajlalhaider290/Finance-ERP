import { vendorCreateSchema, vendorUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type VendorCreate = z.infer<typeof vendorCreateSchema>;
export type VendorUpdate = z.infer<typeof vendorUpdateSchema>;
export type VendorPrimaryKeys = {
	vendorId: string;
}


export type Vendor = VendorPrimaryKeys & {
	vendorName: string;
	contactEmail?: string | null;
	contactPhone?: string | null;
	address?: string | null;
	entityId: string;
	createdAt: Date;
	updatedAt: Date;
}


export type VendorIndex = Omit<Vendor, 'vendorId'> & {
	vendorsLabel: string;
	_meta: ItemMeta<VendorPrimaryKeys>;
}

export type VendorPager = {
	data: VendorIndex[];
	meta: Pager;
}

export type VendorQueryParams = {
	page?: number;
	pageSize?: number;
}

export type VendorDetail = Omit<Vendor, 'vendorId'> & {
	vendorsLabel: string;
	_meta: ItemMeta<VendorPrimaryKeys>;
}

