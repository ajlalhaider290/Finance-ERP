import { formatDate } from '@/util/formatDate';
import { IntercompanySettlementRecordDetail } from '../../../interface';

export const IntercompanySettlementRecordViewDetails = ({ data }: { data?: IntercompanySettlementRecordDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Transaction Id</span>
          <div className="col-span-2 text-sm">{data?.settlementRecordsLabel || data?.transactionId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Settlement Date</span>
          <div className="col-span-2 text-sm">{data?.settlementDate ? formatDate(data?.settlementDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Settlement Amount</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.settlementAmount)
    ? (data?.settlementAmount as unknown[]).join(', ')
    : (typeof data?.settlementAmount === 'object' && data?.settlementAmount !== null
        ? JSON.stringify(data?.settlementAmount)
        : (data?.settlementAmount as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Currency Code</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.currencyCode)
    ? (data?.currencyCode as unknown[]).join(', ')
    : (typeof data?.currencyCode === 'object' && data?.currencyCode !== null
        ? JSON.stringify(data?.currencyCode)
        : (data?.currencyCode as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <span className="font-medium text-sm">Recorded By Id</span>
          <div className="col-span-2 text-sm">{data?.settlementsRecordedLabel || data?.recordedBy || '-'}</div>
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
