import { TableConfig } from "@/types/table";

export const approvalHistoryTableConfigDefault: TableConfig = {
  columns: {
      taskId: { visible: true, title: 'Task Id', dataIndex: 'taskId' },
      documentType: { visible: true, title: 'Document Type', dataIndex: 'documentType' },
      documentId: { visible: true, title: 'Document Id', dataIndex: 'documentId' },
      approverId: { visible: true, title: 'Approver Id', dataIndex: 'approverId' },
      actionValue: { visible: true, title: 'Action Value', dataIndex: 'actionValue' },
      actionDate: { visible: true, title: 'Action Date', dataIndex: 'actionDate' },
      userComment: { visible: true, title: 'User Comment', dataIndex: 'userComment' }
		},
};
export default approvalHistoryTableConfigDefault;