import { paymentAllocationCreateSchema, paymentAllocationUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type PaymentAllocationCreate = z.infer<typeof paymentAllocationCreateSchema>;
export type PaymentAllocationUpdate = z.infer<typeof paymentAllocationUpdateSchema>;
export type PaymentAllocationPrimaryKeys = {
	allocationId: string;
}


export type PaymentAllocation = PaymentAllocationPrimaryKeys & {
	paymentId: string;
	allocatedToType: string;
	allocatedToId: string;
	allocatedAmount: number;
	createdAt: Date;
	updatedAt: Date;
}


export type PaymentAllocationIndex = Omit<PaymentAllocation, 'allocationId'> & {
	allocationsLabel: string;
	_meta: ItemMeta<PaymentAllocationPrimaryKeys>;
}

export type PaymentAllocationPager = {
	data: PaymentAllocationIndex[];
	meta: Pager;
}

export type PaymentAllocationQueryParams = {
	page?: number;
	pageSize?: number;
}

export type PaymentAllocationDetail = Omit<PaymentAllocation, 'allocationId'> & {
	allocationsLabel: string;
	_meta: ItemMeta<PaymentAllocationPrimaryKeys>;
}

