import { TableConfig } from "@/types/table";

export const invoiceDocumentTableConfigDefault: TableConfig = {
  columns: {
      fileUrl: { visible: true, title: 'File Url', dataIndex: 'fileUrl' },
      fileName: { visible: true, title: 'File Name', dataIndex: 'fileName' },
      uploadedBy: { visible: true, title: 'Uploaded By Id', dataIndex: 'uploadedBy' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default invoiceDocumentTableConfigDefault;