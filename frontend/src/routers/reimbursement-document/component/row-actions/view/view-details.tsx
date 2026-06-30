import FileViewer from '@/components/FileViewer';
import { formatDate } from '@/util/formatDate';
import { ReimbursementDocumentDetail } from '../../../interface';

export const ReimbursementDocumentViewDetails = ({ data }: { data?: ReimbursementDocumentDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Reimbursement Request Id</span>
          <div className="col-span-2 text-sm">{data?.reimbursementDocumentsLabel || data?.reimbursementRequestId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Document Type</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.documentType)
    ? (data?.documentType as unknown[]).join(', ')
    : (typeof data?.documentType === 'object' && data?.documentType !== null
        ? JSON.stringify(data?.documentType)
        : (data?.documentType as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">File Url</span>
          <div className="col-span-2 text-sm">{<FileViewer size={50} value={data?.fileUrl} />}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">File Name</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.fileName)
    ? (data?.fileName as unknown[]).join(', ')
    : (typeof data?.fileName === 'object' && data?.fileName !== null
        ? JSON.stringify(data?.fileName)
        : (data?.fileName as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Uploaded By Id</span>
          <div className="col-span-2 text-sm">{data?.documentsUploadedLabel || data?.uploadedBy || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Created At</span>
          <div className="col-span-2 text-sm">{data?.createdAt ? formatDate(data?.createdAt, 'TIMESTAMP') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Updated At</span>
          <div className="col-span-2 text-sm">{data?.updatedAt ? formatDate(data?.updatedAt, 'TIMESTAMP') : '-'}</div>
        </div>
          </div>
        </div>
      )}
    </>
  );
};
