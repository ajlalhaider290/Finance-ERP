import { formatDate } from '@/util/formatDate';
import { ApprovalTaskDetail } from '../../../interface';

export const ApprovalTaskViewDetails = ({ data }: { data?: ApprovalTaskDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
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
          <span className="font-medium text-sm">Assigned To User Id</span>
          <div className="col-span-2 text-sm">{data?.assignedApprovalTasksLabel || data?.assignedToUserId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Assigned To Role</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.assignedToRole)
    ? (data?.assignedToRole as unknown[]).join(', ')
    : (typeof data?.assignedToRole === 'object' && data?.assignedToRole !== null
        ? JSON.stringify(data?.assignedToRole)
        : (data?.assignedToRole as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Status</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.status)
    ? (data?.status as unknown[]).join(', ')
    : (typeof data?.status === 'object' && data?.status !== null
        ? JSON.stringify(data?.status)
        : (data?.status as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">User Comment</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.userComment)
    ? (data?.userComment as unknown[]).join(', ')
    : (typeof data?.userComment === 'object' && data?.userComment !== null
        ? JSON.stringify(data?.userComment)
        : (data?.userComment as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Actioned By Id</span>
          <div className="col-span-2 text-sm">{data?.actionedApprovalTasksLabel || data?.actionedBy || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Actioned At</span>
          <div className="col-span-2 text-sm">{data?.actionedAt ? formatDate(data?.actionedAt, 'DATE_TIME') : '-'}</div>
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
