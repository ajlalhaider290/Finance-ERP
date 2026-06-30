import { formatDate } from '@/util/formatDate';
import { PaymentAllocationDetail } from '../../../interface';

export const PaymentAllocationViewDetails = ({ data }: { data?: PaymentAllocationDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Payment Id</span>
          <div className="col-span-2 text-sm">{data?.allocationsLabel || data?.paymentId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Allocated To Type</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.allocatedToType)
    ? (data?.allocatedToType as unknown[]).join(', ')
    : (typeof data?.allocatedToType === 'object' && data?.allocatedToType !== null
        ? JSON.stringify(data?.allocatedToType)
        : (data?.allocatedToType as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Allocated To Id</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.allocatedToId)
    ? (data?.allocatedToId as unknown[]).join(', ')
    : (typeof data?.allocatedToId === 'object' && data?.allocatedToId !== null
        ? JSON.stringify(data?.allocatedToId)
        : (data?.allocatedToId as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Allocated Amount</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.allocatedAmount)
    ? (data?.allocatedAmount as unknown[]).join(', ')
    : (typeof data?.allocatedAmount === 'object' && data?.allocatedAmount !== null
        ? JSON.stringify(data?.allocatedAmount)
        : (data?.allocatedAmount as string | number | boolean | null | undefined))) ?? '-'}</div>
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
