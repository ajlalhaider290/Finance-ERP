import { TableConfig } from "@/types/table";

export const vendorTableConfigDefault: TableConfig = {
  columns: {
      vendorName: { visible: true, title: 'Vendor Name', dataIndex: 'vendorName' },
      contactEmail: { visible: true, title: 'Contact Email', dataIndex: 'contactEmail' },
      contactPhone: { visible: true, title: 'Contact Phone', dataIndex: 'contactPhone' },
      address: { visible: true, title: 'Address', dataIndex: 'address' },
      entityId: { visible: true, title: 'Entity Id', dataIndex: 'entityId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default vendorTableConfigDefault;