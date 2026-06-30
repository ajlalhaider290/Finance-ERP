import { TableConfig } from "@/types/table";

export const invoiceTableConfigDefault: TableConfig = {
  columns: {
      vendorId: { visible: true, title: 'Vendor Id', dataIndex: 'vendorId' },
      customerId: { visible: true, title: 'Customer Id', dataIndex: 'customerId' },
      invoiceNumber: { visible: true, title: 'Invoice Number', dataIndex: 'invoiceNumber' },
      invoiceDate: { visible: true, title: 'Invoice Date', dataIndex: 'invoiceDate' },
      dueDate: { visible: true, title: 'Due Date', dataIndex: 'dueDate' },
      currencyCode: { visible: true, title: 'Currency Code', dataIndex: 'currencyCode' },
      subtotal: { visible: true, title: 'Subtotal', dataIndex: 'subtotal' },
      taxAmount: { visible: true, title: 'Tax Amount', dataIndex: 'taxAmount' },
      totalAmount: { visible: true, title: 'Total Amount', dataIndex: 'totalAmount' },
      paidAmount: { visible: true, title: 'Paid Amount', dataIndex: 'paidAmount' },
      balanceDue: { visible: true, title: 'Balance Due', dataIndex: 'balanceDue' },
      paymentStatus: { visible: true, title: 'Payment Status', dataIndex: 'paymentStatus' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      currentApproverId: { visible: true, title: 'Current Approver Id', dataIndex: 'currentApproverId' },
      invoiceDocumentId: { visible: true, title: 'Invoice Document Id', dataIndex: 'invoiceDocumentId' },
      entityId: { visible: true, title: 'Entity Id', dataIndex: 'entityId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default invoiceTableConfigDefault;