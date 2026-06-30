import { formatDate } from '@/util/formatDate';
import { CompanyEntityDetail } from '../../../interface';

export const CompanyEntityViewDetails = ({ data }: { data?: CompanyEntityDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Entity Name</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.entityName)
    ? (data?.entityName as unknown[]).join(', ')
    : (typeof data?.entityName === 'object' && data?.entityName !== null
        ? JSON.stringify(data?.entityName)
        : (data?.entityName as string | number | boolean | null | undefined))) ?? '-'}</div>
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
