import { formatDate } from '@/util/formatDate';
import { ReimbursementStatusHistoryDetail } from '../../../interface';

export const ReimbursementStatusHistoryViewDetails = ({ data }: { data?: ReimbursementStatusHistoryDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Reimbursement Request Id</span>
          <div className="col-span-2 text-sm">{data?.statusHistoryLabel || data?.reimbursementRequestId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Old Status</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.oldStatus)
    ? (data?.oldStatus as unknown[]).join(', ')
    : (typeof data?.oldStatus === 'object' && data?.oldStatus !== null
        ? JSON.stringify(data?.oldStatus)
        : (data?.oldStatus as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">New Status</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.newStatus)
    ? (data?.newStatus as unknown[]).join(', ')
    : (typeof data?.newStatus === 'object' && data?.newStatus !== null
        ? JSON.stringify(data?.newStatus)
        : (data?.newStatus as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Changed By Id</span>
          <div className="col-span-2 text-sm">{data?.statusChangesMadeLabel || data?.changedBy || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Change Date</span>
          <div className="col-span-2 text-sm">{data?.changeDate ? formatDate(data?.changeDate, 'TIMESTAMP') : '-'}</div>
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
