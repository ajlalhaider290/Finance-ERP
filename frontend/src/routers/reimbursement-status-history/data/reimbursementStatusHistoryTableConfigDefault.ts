import { TableConfig } from "@/types/table";

export const reimbursementStatusHistoryTableConfigDefault: TableConfig = {
  columns: {
      reimbursementRequestId: { visible: true, title: 'Reimbursement Request Id', dataIndex: 'reimbursementRequestId' },
      oldStatus: { visible: true, title: 'Old Status', dataIndex: 'oldStatus' },
      newStatus: { visible: true, title: 'New Status', dataIndex: 'newStatus' },
      changedBy: { visible: true, title: 'Changed By Id', dataIndex: 'changedBy' },
      changeDate: { visible: true, title: 'Change Date', dataIndex: 'changeDate' },
      userComment: { visible: true, title: 'User Comment', dataIndex: 'userComment' }
		},
};
export default reimbursementStatusHistoryTableConfigDefault;