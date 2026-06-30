export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface PaymentPrimaryKeys {
	paymentId: string;
}
export interface CreatePaymentInput {
	paymentDate: Date;
	amount: number;
	currencyCode: string;
	paymentMethod: string;
	status: string;
	paidBy?: string | null;
	entityId: string;
}

export type UpdatePaymentInput = CreatePaymentInput;

export interface QueryPaymentInput {
	page? : number;
	pageSize? : number;

}
