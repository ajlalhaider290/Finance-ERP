import { formatDate } from '@/util/formatDate';
import { ApprovalHistoryDetail } from '../../../interface';

export const ApprovalHistoryViewDetails = ({ data }: { data?: ApprovalHistoryDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Task Id</span>
          <div className="col-span-2 text-sm">{data?.approvalHistoryLabel || data?.taskId || '-'}</div>
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
          <span className="font-medium text-sm">Document Id</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.documentId)
    ? (data?.documentId as unknown[]).join(', ')
    : (typeof data?.documentId === 'object' && data?.documentId !== null
        ? JSON.stringify(data?.documentId)
        : (data?.documentId as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Approver Id</span>
          <div className="col-span-2 text-sm">{data?.approvalsMadeLabel || data?.approverId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Action Value</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.actionValue)
    ? (data?.actionValue as unknown[]).join(', ')
    : (typeof data?.actionValue === 'object' && data?.actionValue !== null
        ? JSON.stringify(data?.actionValue)
        : (data?.actionValue as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Action Date</span>
          <div className="col-span-2 text-sm">{data?.actionDate ? formatDate(data?.actionDate, 'TIMESTAMP') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">User Comment</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.userComment)
    ? (data?.userComment as unknown[]).join(', ')
    : (typeof data?.userComment === 'object' && data?.userComment !== null
        ? JSON.stringify(data?.userComment)
        : (data?.userComment as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>
          </div>
        </div>
      )}
    </>
  );
};
