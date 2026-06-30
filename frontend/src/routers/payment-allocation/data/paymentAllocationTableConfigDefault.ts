import { TableConfig } from "@/types/table";

export const paymentAllocationTableConfigDefault: TableConfig = {
  columns: {
      paymentId: { visible: true, title: 'Payment Id', dataIndex: 'paymentId' },
      allocatedToType: { visible: true, title: 'Allocated To Type', dataIndex: 'allocatedToType' },
      allocatedToId: { visible: true, title: 'Allocated To Id', dataIndex: 'allocatedToId' },
      allocatedAmount: { visible: true, title: 'Allocated Amount', dataIndex: 'allocatedAmount' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default paymentAllocationTableConfigDefault;