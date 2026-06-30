import { formatDate } from '@/util/formatDate';
import { CustomerDetail } from '../../../interface';

export const CustomerViewDetails = ({ data }: { data?: CustomerDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Customer Name</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.customerName)
    ? (data?.customerName as unknown[]).join(', ')
    : (typeof data?.customerName === 'object' && data?.customerName !== null
        ? JSON.stringify(data?.customerName)
        : (data?.customerName as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Contact Email</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.contactEmail)
    ? (data?.contactEmail as unknown[]).join(', ')
    : (typeof data?.contactEmail === 'object' && data?.contactEmail !== null
        ? JSON.stringify(data?.contactEmail)
        : (data?.contactEmail as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Contact Phone</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.contactPhone)
    ? (data?.contactPhone as unknown[]).join(', ')
    : (typeof data?.contactPhone === 'object' && data?.contactPhone !== null
        ? JSON.stringify(data?.contactPhone)
        : (data?.contactPhone as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Address</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.address)
    ? (data?.address as unknown[]).join(', ')
    : (typeof data?.address === 'object' && data?.address !== null
        ? JSON.stringify(data?.address)
        : (data?.address as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Entity Id</span>
          <div className="col-span-2 text-sm">{data?.customersLabel || data?.entityId || '-'}</div>
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
