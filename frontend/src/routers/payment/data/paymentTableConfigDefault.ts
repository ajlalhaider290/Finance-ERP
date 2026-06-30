import { TableConfig } from "@/types/table";

export const paymentTableConfigDefault: TableConfig = {
  columns: {
      paymentDate: { visible: true, title: 'Payment Date', dataIndex: 'paymentDate' },
      amount: { visible: true, title: 'Amount', dataIndex: 'amount' },
      currencyCode: { visible: true, title: 'Currency Code', dataIndex: 'currencyCode' },
      paymentMethod: { visible: true, title: 'Payment Method', dataIndex: 'paymentMethod' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      paidBy: { visible: true, title: 'Paid By Id', dataIndex: 'paidBy' },
      entityId: { visible: true, title: 'Entity Id', dataIndex: 'entityId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default paymentTableConfigDefault;