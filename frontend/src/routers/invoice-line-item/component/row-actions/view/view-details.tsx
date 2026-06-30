import { formatDate } from '@/util/formatDate';
import { InvoiceLineItemDetail } from '../../../interface';

export const InvoiceLineItemViewDetails = ({ data }: { data?: InvoiceLineItemDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Invoice Id</span>
          <div className="col-span-2 text-sm">{data?.lineItemsLabel || data?.invoiceId || '-'}</div>
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
          <span className="font-medium text-sm">Quantity</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.quantity)
    ? (data?.quantity as unknown[]).join(', ')
    : (typeof data?.quantity === 'object' && data?.quantity !== null
        ? JSON.stringify(data?.quantity)
        : (data?.quantity as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Unit Price</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.unitPrice)
    ? (data?.unitPrice as unknown[]).join(', ')
    : (typeof data?.unitPrice === 'object' && data?.unitPrice !== null
        ? JSON.stringify(data?.unitPrice)
        : (data?.unitPrice as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Line Total</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.lineTotal)
    ? (data?.lineTotal as unknown[]).join(', ')
    : (typeof data?.lineTotal === 'object' && data?.lineTotal !== null
        ? JSON.stringify(data?.lineTotal)
        : (data?.lineTotal as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Tax Code Id</span>
          <div className="col-span-2 text-sm">{data?.invoiceLineItemsLabel || data?.taxCodeId || '-'}</div>
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
