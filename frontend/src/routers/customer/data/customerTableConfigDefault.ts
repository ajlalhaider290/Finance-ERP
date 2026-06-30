import { TableConfig } from "@/types/table";

export const customerTableConfigDefault: TableConfig = {
  columns: {
      customerName: { visible: true, title: 'Customer Name', dataIndex: 'customerName' },
      contactEmail: { visible: true, title: 'Contact Email', dataIndex: 'contactEmail' },
      contactPhone: { visible: true, title: 'Contact Phone', dataIndex: 'contactPhone' },
      address: { visible: true, title: 'Address', dataIndex: 'address' },
      entityId: { visible: true, title: 'Entity Id', dataIndex: 'entityId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default customerTableConfigDefault;