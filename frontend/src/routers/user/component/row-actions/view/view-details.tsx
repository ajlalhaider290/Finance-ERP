import { formatDate } from '@/util/formatDate';
import { UserDetail } from '../../../interface';

export const UserViewDetails = ({ data }: { data?: UserDetail }) => {
  return (
    <>
      {data && (
        <div className="flex flex-col h-full">

          <div className="grid grid-cols-1 md:grid-cols-1 items-start">
            <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Email</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.email)
    ? (data?.email as unknown[]).join(', ')
    : (typeof data?.email === 'object' && data?.email !== null
        ? JSON.stringify(data?.email)
        : (data?.email as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Username</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.username)
    ? (data?.username as unknown[]).join(', ')
    : (typeof data?.username === 'object' && data?.username !== null
        ? JSON.stringify(data?.username)
        : (data?.username as string | number | boolean | null | undefined))) ?? '-'}</div>
        </div>

        <div className="grid grid-cols-3 py-3 border-b">
          <span className="font-medium text-sm">Role</span>
          <div className="col-span-2 text-sm">{(Array.isArray(data?.role)
    ? (data?.role as unknown[]).join(', ')
    : (typeof data?.role === 'object' && data?.role !== null
        ? JSON.stringify(data?.role)
        : (data?.role as string | number | boolean | null | undefined))) ?? '-'}</div>
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
          <span className="font-medium text-sm">Entity Id</span>
          <div className="col-span-2 text-sm">{data?.usersLabel || data?.entityId || '-'}</div>
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
