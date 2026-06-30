import { TableConfig } from "@/types/table";

export const approvalTaskTableConfigDefault: TableConfig = {
  columns: {
      documentType: { visible: true, title: 'Document Type', dataIndex: 'documentType' },
      documentId: { visible: true, title: 'Document Id', dataIndex: 'documentId' },
      assignedToUserId: { visible: true, title: 'Assigned To User Id', dataIndex: 'assignedToUserId' },
      assignedToRole: { visible: true, title: 'Assigned To Role', dataIndex: 'assignedToRole' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      userComment: { visible: true, title: 'User Comment', dataIndex: 'userComment' },
      actionedBy: { visible: true, title: 'Actioned By Id', dataIndex: 'actionedBy' },
      actionedAt: { visible: true, title: 'Actioned At', dataIndex: 'actionedAt' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default approvalTaskTableConfigDefault;