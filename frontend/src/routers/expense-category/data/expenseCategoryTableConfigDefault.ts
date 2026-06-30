import { TableConfig } from "@/types/table";

export const expenseCategoryTableConfigDefault: TableConfig = {
  columns: {
      categoryName: { visible: true, title: 'Category Name', dataIndex: 'categoryName' },
      description: { visible: true, title: 'Description', dataIndex: 'description' },
      entityId: { visible: true, title: 'Entity Id', dataIndex: 'entityId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default expenseCategoryTableConfigDefault;