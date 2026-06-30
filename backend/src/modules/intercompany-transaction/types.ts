interface IIntercompanyTransactionsLineDetails_019f085327 extends Record<string, unknown> {
	description: string;
	amount: number;
	accountId: string;
	taxCodeId: string;
}

export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface IntercompanyTransactionPrimaryKeys {
	transactionId: string;
}
export interface CreateIntercompanyTransactionInput {
	sourceEntityId: string;
	targetEntityId: string;
	transactionDate: Date;
	transactionType: string;
	currencyCode: string;
	amount: number;
	lineDetail?: IIntercompanyTransactionsLineDetails_019f085327[] | null;
	taxAmount: number;
	status: string;
	currentApproverId?: string | null;
}

export type UpdateIntercompanyTransactionInput = CreateIntercompanyTransactionInput;

export interface QueryIntercompanyTransactionInput {
	page? : number;
	pageSize? : number;

}
