import { formatDate } from '@/util/formatDate';
import { InvoiceDetail } from '../../../interface';

export const InvoiceViewDetails = ({ data }: { data?: InvoiceDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Vendor Id</span>
          <div className="col-span-2 text-sm">{data?.invoicesFromVendorLabel || data?.vendorId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Customer Id</span>
          <div className="col-span-2 text-sm">{data?.invoicesToCustomerLabel || data?.customerId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Invoice Number</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.invoiceNumber)
    ? (data?.invoiceNumber as unknown[]).join(', ')
    : (typeof data?.invoiceNumber === 'object' && data?.invoiceNumber !== null
        ? JSON.stringify(data?.invoiceNumber)
        : (data?.invoiceNumber as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Invoice Date</span>
          <div className="col-span-2 text-sm">{data?.invoiceDate ? formatDate(data?.invoiceDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Due Date</span>
          <div className="col-span-2 text-sm">{data?.dueDate ? formatDate(data?.dueDate, 'DATE') : '-'}</div>
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
          <span className="font-medium text-sm">Subtotal</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.subtotal)
    ? (data?.subtotal as unknown[]).join(', ')
    : (typeof data?.subtotal === 'object' && data?.subtotal !== null
        ? JSON.stringify(data?.subtotal)
        : (data?.subtotal as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <span className="font-medium text-sm">Total Amount</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.totalAmount)
    ? (data?.totalAmount as unknown[]).join(', ')
    : (typeof data?.totalAmount === 'object' && data?.totalAmount !== null
        ? JSON.stringify(data?.totalAmount)
        : (data?.totalAmount as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Paid Amount</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.paidAmount)
    ? (data?.paidAmount as unknown[]).join(', ')
    : (typeof data?.paidAmount === 'object' && data?.paidAmount !== null
        ? JSON.stringify(data?.paidAmount)
        : (data?.paidAmount as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Balance Due</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.balanceDue)
    ? (data?.balanceDue as unknown[]).join(', ')
    : (typeof data?.balanceDue === 'object' && data?.balanceDue !== null
        ? JSON.stringify(data?.balanceDue)
        : (data?.balanceDue as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Payment Status</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.paymentStatus)
    ? (data?.paymentStatus as unknown[]).join(', ')
    : (typeof data?.paymentStatus === 'object' && data?.paymentStatus !== null
        ? JSON.stringify(data?.paymentStatus)
        : (data?.paymentStatus as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <div className="col-span-2 text-sm">{data?.invoiceApprovalsAssignedLabel || data?.currentApproverId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Invoice Document Id</span>
          <div className="col-span-2 text-sm">{data?.invoiceRecordsLabel || data?.invoiceDocumentId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Entity Id</span>
          <div className="col-span-2 text-sm">{data?.invoicesLabel || data?.entityId || '-'}</div>
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
