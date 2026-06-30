export interface ItemMeta<T = Record<string, any>> {
	primaryKeys: T;
	label: string;
}

export interface IntercompanySettlementRecordPrimaryKeys {
	settlementRecordId: string;
}
export interface CreateIntercompanySettlementRecordInput {
	transactionId: string;
	settlementDate: Date;
	settlementAmount: number;
	currencyCode: string;
	status: string;
	recordedBy: string;
}

export type UpdateIntercompanySettlementRecordInput = CreateIntercompanySettlementRecordInput;

export interface QueryIntercompanySettlementRecordInput {
	page? : number;
	pageSize? : number;

}
