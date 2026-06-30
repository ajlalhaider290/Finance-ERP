import { TableConfig } from "@/types/table";

export const reimbursementRequestTableConfigDefault: TableConfig = {
  columns: {
      businessPurpose: { visible: true, title: 'Business Purpose', dataIndex: 'businessPurpose' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      totalAmount: { visible: true, title: 'Total', dataIndex: 'totalAmount' },
      expenseDate: { visible: true, title: 'Expense Date', dataIndex: 'expenseDate' },
      categoryId: { visible: true, title: 'Category', dataIndex: 'categoryId' },
      employeeId: { visible: true, title: 'Employee', dataIndex: 'employeeId' },
      entityId: { visible: true, title: 'Entity', dataIndex: 'entityId' },
      amount: { visible: true, title: 'Amount', dataIndex: 'amount' },
      taxAmount: { visible: false, title: 'Tax', dataIndex: 'taxAmount' },
      currencyCode: { visible: false, title: 'Currency', dataIndex: 'currencyCode' },
      costCenter: { visible: false, title: 'Cost Center', dataIndex: 'costCenter' },
      department: { visible: false, title: 'Department', dataIndex: 'department' },
      currentApproverId: { visible: false, title: 'Current Approver', dataIndex: 'currentApproverId' },
      paidDate: { visible: false, title: 'Paid Date', dataIndex: 'paidDate' },
      createdAt: { visible: false, title: 'Created', dataIndex: 'createdAt' },
      updatedAt: { visible: false, title: 'Updated', dataIndex: 'updatedAt' }
		},
};
export default reimbursementRequestTableConfigDefault;
