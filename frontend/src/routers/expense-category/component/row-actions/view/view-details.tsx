import { formatDate } from '@/util/formatDate';
import { ExpenseCategoryDetail } from '../../../interface';

export const ExpenseCategoryViewDetails = ({ data }: { data?: ExpenseCategoryDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Category Name</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.categoryName)
    ? (data?.categoryName as unknown[]).join(', ')
    : (typeof data?.categoryName === 'object' && data?.categoryName !== null
        ? JSON.stringify(data?.categoryName)
        : (data?.categoryName as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <div className="col-span-2 text-sm">{data?.expenseCategoriesLabel || data?.entityId || '-'}</div>
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
