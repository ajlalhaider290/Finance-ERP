import { paymentCreateSchema, paymentUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type PaymentCreate = z.infer<typeof paymentCreateSchema>;
export type PaymentUpdate = z.infer<typeof paymentUpdateSchema>;
export type PaymentPrimaryKeys = {
	paymentId: string;
}


export type Payment = PaymentPrimaryKeys & {
	paymentDate: Date;
	amount: number;
	currencyCode: string;
	paymentMethod: string;
	status: string;
	paidBy?: string | null;
	entityId: string;
	createdAt: Date;
	updatedAt: Date;
}


export type PaymentIndex = Omit<Payment, 'paymentId'> & {
	paymentsMadeLabel: string;
	paymentsLabel: string;
	_meta: ItemMeta<PaymentPrimaryKeys>;
}

export type PaymentPager = {
	data: PaymentIndex[];
	meta: Pager;
}

export type PaymentQueryParams = {
	page?: number;
	pageSize?: number;
}

export type PaymentDetail = Omit<Payment, 'paymentId'> & {
	paymentsMadeLabel: string;
	paymentsLabel: string;
	_meta: ItemMeta<PaymentPrimaryKeys>;
}

