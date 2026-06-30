import { formatDate } from '@/util/formatDate';
import { JSONValueRenderer } from '@/components/JSONValueRenderer';
import { IntercompanyTransactionDetail } from '../../../interface';

export const IntercompanyTransactionViewDetails = ({ data }: { data?: IntercompanyTransactionDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Source Entity Id</span>
          <div className="col-span-2 text-sm">{data?.transactionsFromSourceLabel || data?.sourceEntityId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Target Entity Id</span>
          <div className="col-span-2 text-sm">{data?.transactionsToTargetLabel || data?.targetEntityId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Transaction Date</span>
          <div className="col-span-2 text-sm">{data?.transactionDate ? formatDate(data?.transactionDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Transaction Type</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.transactionType)
    ? (data?.transactionType as unknown[]).join(', ')
    : (typeof data?.transactionType === 'object' && data?.transactionType !== null
        ? JSON.stringify(data?.transactionType)
        : (data?.transactionType as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <span className="font-medium text-sm">Amount</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.amount)
    ? (data?.amount as unknown[]).join(', ')
    : (typeof data?.amount === 'object' && data?.amount !== null
        ? JSON.stringify(data?.amount)
        : (data?.amount as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Line Details</span>
          <div className="col-span-2 text-sm">{<JSONValueRenderer value={data?.lineDetail} />}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Tax Amount</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.taxAmount)
    ? (data?.taxAmount as unknown[]).join(', ')
    : (typeof data?.taxAmount === 'object' && data?.taxAmount !== null
        ? JSON.stringify(data?.taxAmount)
        : (data?.taxAmount as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <span className="font-medium text-sm">Current Approver Id</span>
          <div className="col-span-2 text-sm">{data?.intercompanyApprovalsAssignedLabel || data?.currentApproverId || '-'}</div>
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
