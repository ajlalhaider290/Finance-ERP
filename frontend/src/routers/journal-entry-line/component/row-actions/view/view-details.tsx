import { formatDate } from '@/util/formatDate';
import { JournalEntryLineDetail } from '../../../interface';

export const JournalEntryLineViewDetails = ({ data }: { data?: JournalEntryLineDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Journal Entry Id</span>
          <div className="col-span-2 text-sm">{data?.entryLinesLabel || data?.journalEntryId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Debit Amount</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.debitAmount)
    ? (data?.debitAmount as unknown[]).join(', ')
    : (typeof data?.debitAmount === 'object' && data?.debitAmount !== null
        ? JSON.stringify(data?.debitAmount)
        : (data?.debitAmount as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Credit Amount</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.creditAmount)
    ? (data?.creditAmount as unknown[]).join(', ')
    : (typeof data?.creditAmount === 'object' && data?.creditAmount !== null
        ? JSON.stringify(data?.creditAmount)
        : (data?.creditAmount as string | number | boolean | null | undefined))) ?? '-'}</div>
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
