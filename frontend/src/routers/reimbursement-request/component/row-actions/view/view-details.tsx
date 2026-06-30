import { formatDate } from '@/util/formatDate';
import { ReimbursementRequestDetail } from '../../../interface';

export const ReimbursementRequestViewDetails = ({ data }: { data?: ReimbursementRequestDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Employee Id</span>
          <div className="col-span-2 text-sm">{data?.employeeLabel || data?.employeeId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Business Purpose</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.businessPurpose)
    ? (data?.businessPurpose as unknown[]).join(', ')
    : (typeof data?.businessPurpose === 'object' && data?.businessPurpose !== null
        ? JSON.stringify(data?.businessPurpose)
        : (data?.businessPurpose as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Expense Date</span>
          <div className="col-span-2 text-sm">{data?.expenseDate ? formatDate(data?.expenseDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Category Id</span>
          <div className="col-span-2 text-sm">{data?.categoryLabel || data?.categoryId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Cost Center</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.costCenter)
    ? (data?.costCenter as unknown[]).join(', ')
    : (typeof data?.costCenter === 'object' && data?.costCenter !== null
        ? JSON.stringify(data?.costCenter)
        : (data?.costCenter as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Department</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.department)
    ? (data?.department as unknown[]).join(', ')
    : (typeof data?.department === 'object' && data?.department !== null
        ? JSON.stringify(data?.department)
        : (data?.department as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <span className="font-medium text-sm">Status</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.status)
    ? (data?.status as unknown[]).join(', ')
    : (typeof data?.status === 'object' && data?.status !== null
        ? JSON.stringify(data?.status)
        : (data?.status as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Current Approver Id</span>
          <div className="col-span-2 text-sm">{data?.approvalsAssignedLabel || data?.currentApproverId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Paid Date</span>
          <div className="col-span-2 text-sm">{data?.paidDate ? formatDate(data?.paidDate, 'DATE') : '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Entity Id</span>
          <div className="col-span-2 text-sm">{data?.entityLabel || data?.entityId || '-'}</div>
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
