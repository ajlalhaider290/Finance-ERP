export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface PaymentAllocationPrimaryKeys {
	allocationId: string;
}
export interface CreatePaymentAllocationInput {
	paymentId: string;
	allocatedToType: string;
	allocatedToId: string;
	allocatedAmount: number;
}

export type UpdatePaymentAllocationInput = CreatePaymentAllocationInput;

export interface QueryPaymentAllocationInput {
	page? : number;
	pageSize? : number;

}
