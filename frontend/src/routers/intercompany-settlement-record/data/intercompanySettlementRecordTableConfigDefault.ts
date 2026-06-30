import { TableConfig } from "@/types/table";

export const intercompanySettlementRecordTableConfigDefault: TableConfig = {
  columns: {
      transactionId: { visible: true, title: 'Transaction Id', dataIndex: 'transactionId' },
      settlementDate: { visible: true, title: 'Settlement Date', dataIndex: 'settlementDate' },
      settlementAmount: { visible: true, title: 'Settlement Amount', dataIndex: 'settlementAmount' },
      currencyCode: { visible: true, title: 'Currency Code', dataIndex: 'currencyCode' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      recordedBy: { visible: true, title: 'Recorded By Id', dataIndex: 'recordedBy' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default intercompanySettlementRecordTableConfigDefault;