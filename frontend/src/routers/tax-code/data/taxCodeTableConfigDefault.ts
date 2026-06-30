import { TableConfig } from "@/types/table";

export const taxCodeTableConfigDefault: TableConfig = {
  columns: {
      taxCodeName: { visible: true, title: 'Tax Code Name', dataIndex: 'taxCodeName' },
      rate: { visible: true, title: 'Rate', dataIndex: 'rate' },
      description: { visible: true, title: 'Description', dataIndex: 'description' },
      entityId: { visible: true, title: 'Entity Id', dataIndex: 'entityId' },
      isActive: { visible: true, title: 'Is Active', dataIndex: 'isActive' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default taxCodeTableConfigDefault;