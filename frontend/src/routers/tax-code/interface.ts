import { taxCodeCreateSchema, taxCodeUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type TaxCodeCreate = z.infer<typeof taxCodeCreateSchema>;
export type TaxCodeUpdate = z.infer<typeof taxCodeUpdateSchema>;
export type TaxCodePrimaryKeys = {
	taxCodeId: string;
}


export type TaxCode = TaxCodePrimaryKeys & {
	taxCodeName: string;
	rate: number;
	description?: string | null;
	entityId: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}


export type TaxCodeIndex = Omit<TaxCode, 'taxCodeId'> & {
	taxCodesLabel: string;
	_meta: ItemMeta<TaxCodePrimaryKeys>;
}

export type TaxCodePager = {
	data: TaxCodeIndex[];
	meta: Pager;
}

export type TaxCodeQueryParams = {
	page?: number;
	pageSize?: number;
}

export type TaxCodeDetail = Omit<TaxCode, 'taxCodeId'> & {
	taxCodesLabel: string;
	_meta: ItemMeta<TaxCodePrimaryKeys>;
}

