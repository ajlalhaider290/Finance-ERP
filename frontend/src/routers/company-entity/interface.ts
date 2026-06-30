import { companyEntityCreateSchema, companyEntityUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type CompanyEntityCreate = z.infer<typeof companyEntityCreateSchema>;
export type CompanyEntityUpdate = z.infer<typeof companyEntityUpdateSchema>;
export type CompanyEntityPrimaryKeys = {
	entityId: string;
}


export type CompanyEntity = CompanyEntityPrimaryKeys & {
	entityName: string;
	currencyCode: string;
	createdAt: Date;
	updatedAt: Date;
}


export type CompanyEntityIndex = Omit<CompanyEntity, 'entityId'> & {
	_meta: ItemMeta<CompanyEntityPrimaryKeys>;
}

export type CompanyEntityPager = {
	data: CompanyEntityIndex[];
	meta: Pager;
}

export type CompanyEntityQueryParams = {
	page?: number;
	pageSize?: number;
}

export type CompanyEntityDetail = Omit<CompanyEntity, 'entityId'> & {
	_meta: ItemMeta<CompanyEntityPrimaryKeys>;
}

