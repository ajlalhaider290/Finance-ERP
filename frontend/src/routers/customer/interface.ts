import { customerCreateSchema, customerUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type CustomerCreate = z.infer<typeof customerCreateSchema>;
export type CustomerUpdate = z.infer<typeof customerUpdateSchema>;
export type CustomerPrimaryKeys = {
	customerId: string;
}


export type Customer = CustomerPrimaryKeys & {
	customerName: string;
	contactEmail?: string | null;
	contactPhone?: string | null;
	address?: string | null;
	entityId: string;
	createdAt: Date;
	updatedAt: Date;
}


export type CustomerIndex = Omit<Customer, 'customerId'> & {
	customersLabel: string;
	_meta: ItemMeta<CustomerPrimaryKeys>;
}

export type CustomerPager = {
	data: CustomerIndex[];
	meta: Pager;
}

export type CustomerQueryParams = {
	page?: number;
	pageSize?: number;
}

export type CustomerDetail = Omit<Customer, 'customerId'> & {
	customersLabel: string;
	_meta: ItemMeta<CustomerPrimaryKeys>;
}

