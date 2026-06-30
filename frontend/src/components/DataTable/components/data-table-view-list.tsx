import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { DataTableViewListProps } from '../types';
import { DataTableEmptyState } from './data-table-empty-state';
import { DataTableError } from './data-table-error';
import { DataTableSkeleton } from './data-table-skeleton';

export function DataTableViewList<TData, TValue>({
  table,
  columns,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  entityName,
  renderEmptyState,
}: DataTableViewListProps<TData, TValue>) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <DataTableSkeleton columnCount={columns.length} />
        ) : isError ? (
          <DataTableError columnCount={columns.length} message={errorMessage} onRetry={onRetry} />
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <DataTableEmptyState columnCount={columns.length} entityName={entityName} table={table} renderEmptyState={renderEmptyState} />
        )}
      </TableBody>
    </Table>
  );
}
