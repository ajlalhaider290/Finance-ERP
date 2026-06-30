import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/util/formatDate';
import { TaxCodeDetail } from '../../../interface';

export const TaxCodeViewDetails = ({ data }: { data?: TaxCodeDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Tax Code Name</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.taxCodeName)
    ? (data?.taxCodeName as unknown[]).join(', ')
    : (typeof data?.taxCodeName === 'object' && data?.taxCodeName !== null
        ? JSON.stringify(data?.taxCodeName)
        : (data?.taxCodeName as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Rate</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.rate)
    ? (data?.rate as unknown[]).join(', ')
    : (typeof data?.rate === 'object' && data?.rate !== null
        ? JSON.stringify(data?.rate)
        : (data?.rate as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <span className="font-medium text-sm">Entity Id</span>
          <div className="col-span-2 text-sm">{data?.taxCodesLabel || data?.entityId || '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Is Active</span>
          <div className="col-span-2 text-sm">{<Badge variant={data?.isActive ? 'default' : 'secondary'}>{data?.isActive === true ? 'Active' : 'Inactive'}</Badge>}</div>
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
