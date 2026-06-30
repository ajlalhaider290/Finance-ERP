import { TableConfig } from "@/types/table";

export const reimbursementDocumentTableConfigDefault: TableConfig = {
  columns: {
      reimbursementRequestId: { visible: true, title: 'Reimbursement Request Id', dataIndex: 'reimbursementRequestId' },
      documentType: { visible: true, title: 'Document Type', dataIndex: 'documentType' },
      fileUrl: { visible: true, title: 'File Url', dataIndex: 'fileUrl' },
      fileName: { visible: true, title: 'File Name', dataIndex: 'fileName' },
      uploadedBy: { visible: true, title: 'Uploaded By Id', dataIndex: 'uploadedBy' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default reimbursementDocumentTableConfigDefault;