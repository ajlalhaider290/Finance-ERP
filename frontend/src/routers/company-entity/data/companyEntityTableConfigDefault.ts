import { TableConfig } from "@/types/table";

export const companyEntityTableConfigDefault: TableConfig = {
  columns: {
      entityName: { visible: true, title: 'Entity Name', dataIndex: 'entityName' },
      currencyCode: { visible: true, title: 'Currency Code', dataIndex: 'currencyCode' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default companyEntityTableConfigDefault;