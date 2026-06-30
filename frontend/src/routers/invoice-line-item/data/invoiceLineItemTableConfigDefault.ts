import { TableConfig } from "@/types/table";

export const invoiceLineItemTableConfigDefault: TableConfig = {
  columns: {
      invoiceId: { visible: true, title: 'Invoice Id', dataIndex: 'invoiceId' },
      description: { visible: true, title: 'Description', dataIndex: 'description' },
      quantity: { visible: true, title: 'Quantity', dataIndex: 'quantity' },
      unitPrice: { visible: true, title: 'Unit Price', dataIndex: 'unitPrice' },
      lineTotal: { visible: true, title: 'Line Total', dataIndex: 'lineTotal' },
      taxCodeId: { visible: true, title: 'Tax Code Id', dataIndex: 'taxCodeId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default invoiceLineItemTableConfigDefault;