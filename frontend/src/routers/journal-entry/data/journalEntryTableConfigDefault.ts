import { TableConfig } from "@/types/table";

export const journalEntryTableConfigDefault: TableConfig = {
  columns: {
      entryDate: { visible: true, title: 'Entry Date', dataIndex: 'entryDate' },
      description: { visible: true, title: 'Description', dataIndex: 'description' },
      sourceDocumentType: { visible: true, title: 'Source Document Type', dataIndex: 'sourceDocumentType' },
      sourceDocumentId: { visible: true, title: 'Source Document Id', dataIndex: 'sourceDocumentId' },
      entityId: { visible: true, title: 'Entity Id', dataIndex: 'entityId' },
      postedBy: { visible: true, title: 'Posted By Id', dataIndex: 'postedBy' },
      postedAt: { visible: true, title: 'Posted At', dataIndex: 'postedAt' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default journalEntryTableConfigDefault;