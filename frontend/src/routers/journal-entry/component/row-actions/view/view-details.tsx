import { formatDate } from '@/util/formatDate';
import { JournalEntryDetail } from '../../../interface';

export const JournalEntryViewDetails = ({ data }: { data?: JournalEntryDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Entry Date</span>
          <div className="col-span-2 text-sm">{data?.entryDate ? formatDate(data?.entryDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Description</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.description)
    ? (data?.description as unknown[]).join(', ')
    : (typeof data?.description === 'object' && data?.description !== null
        ? JSON.stringify(data?.description)
        : (data?.description as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Source Document Type</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.sourceDocumentType)
    ? (data?.sourceDocumentType as unknown[]).join(', ')
    : (typeof data?.sourceDocumentType === 'object' && data?.sourceDocumentType !== null
        ? JSON.stringify(data?.sourceDocumentType)
        : (data?.sourceDocumentType as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Source Document Id</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.sourceDocumentId)
    ? (data?.sourceDocumentId as unknown[]).join(', ')
    : (typeof data?.sourceDocumentId === 'object' && data?.sourceDocumentId !== null
        ? JSON.stringify(data?.sourceDocumentId)
        : (data?.sourceDocumentId as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Entity Id</span>
          <div className="col-span-2 text-sm">{data?.journalEntriesLabel || data?.entityId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Posted By Id</span>
          <div className="col-span-2 text-sm">{data?.journalEntriesPostedLabel || data?.postedBy || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Posted At</span>
          <div className="col-span-2 text-sm">{data?.postedAt ? formatDate(data?.postedAt, 'DATE_TIME') : '-'}</div>
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
