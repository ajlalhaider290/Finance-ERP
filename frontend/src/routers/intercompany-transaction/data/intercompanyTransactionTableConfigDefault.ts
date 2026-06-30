import { TableConfig } from "@/types/table";

export const intercompanyTransactionTableConfigDefault: TableConfig = {
  columns: {
      sourceEntityId: { visible: true, title: 'Source Entity Id', dataIndex: 'sourceEntityId' },
      targetEntityId: { visible: true, title: 'Target Entity Id', dataIndex: 'targetEntityId' },
      transactionDate: { visible: true, title: 'Transaction Date', dataIndex: 'transactionDate' },
      transactionType: { visible: true, title: 'Transaction Type', dataIndex: 'transactionType' },
      currencyCode: { visible: true, title: 'Currency Code', dataIndex: 'currencyCode' },
      amount: { visible: true, title: 'Amount', dataIndex: 'amount' },
      lineDetail: { visible: true, title: 'Line Details', dataIndex: 'lineDetail' },
      taxAmount: { visible: true, title: 'Tax Amount', dataIndex: 'taxAmount' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      currentApproverId: { visible: true, title: 'Current Approver Id', dataIndex: 'currentApproverId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default intercompanyTransactionTableConfigDefault;