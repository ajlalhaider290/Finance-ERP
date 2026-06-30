import { TableConfig } from "@/types/table";

export const journalEntryLineTableConfigDefault: TableConfig = {
  columns: {
      journalEntryId: { visible: true, title: 'Journal Entry Id', dataIndex: 'journalEntryId' },
      debitAmount: { visible: true, title: 'Debit Amount', dataIndex: 'debitAmount' },
      creditAmount: { visible: true, title: 'Credit Amount', dataIndex: 'creditAmount' },
      description: { visible: true, title: 'Description', dataIndex: 'description' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default journalEntryLineTableConfigDefault;