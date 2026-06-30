import { intercompanySettlementRecordCreateSchema, intercompanySettlementRecordUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager, ItemMeta } from '@/interface/common';


export type IntercompanySettlementRecordCreate = z.infer<typeof intercompanySettlementRecordCreateSchema>;
export type IntercompanySettlementRecordUpdate = z.infer<typeof intercompanySettlementRecordUpdateSchema>;
export type IntercompanySettlementRecordPrimaryKeys = {
	settlementRecordId: string;
}


export type IntercompanySettlementRecord = IntercompanySettlementRecordPrimaryKeys & {
	transactionId: string;
	settlementDate: Date;
	settlementAmount: number;
	currencyCode: string;
	status: string;
	recordedBy: string;
	createdAt: Date;
	updatedAt: Date;
}


export type IntercompanySettlementRecordIndex = Omit<IntercompanySettlementRecord, 'settlementRecordId'> & {
	settlementRecordsLabel: string;
	settlementsRecordedLabel: string;
	_meta: ItemMeta<IntercompanySettlementRecordPrimaryKeys>;
}

export type IntercompanySettlementRecordPager = {
	data: IntercompanySettlementRecordIndex[];
	meta: Pager;
}

export type IntercompanySettlementRecordQueryParams = {
	page?: number;
	pageSize?: number;
}

export type IntercompanySettlementRecordDetail = Omit<IntercompanySettlementRecord, 'settlementRecordId'> & {
	settlementRecordsLabel: string;
	settlementsRecordedLabel: string;
	_meta: ItemMeta<IntercompanySettlementRecordPrimaryKeys>;
}

