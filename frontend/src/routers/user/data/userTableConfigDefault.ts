import { TableConfig } from "@/types/table";

export const userTableConfigDefault: TableConfig = {
  columns: {
      email: { visible: true, title: 'Email', dataIndex: 'email' },
      username: { visible: true, title: 'Username', dataIndex: 'username' },
      role: { visible: true, title: 'Role', dataIndex: 'role' },
      department: { visible: true, title: 'Department', dataIndex: 'department' },
      entityId: { visible: true, title: 'Entity Id', dataIndex: 'entityId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default userTableConfigDefault;