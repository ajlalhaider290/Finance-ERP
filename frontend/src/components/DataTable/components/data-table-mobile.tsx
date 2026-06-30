import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { flexRender } from '@tanstack/react-table';
import { SearchX } from 'lucide-react';
import { COLUMN_IDS } from '../constants';
import { DataTableViewMobileProps } from '../types';

export function DataTableViewMobile<TData>({ table, isLoading, entityName = 'records', emptyStateIcon: EmptyStateIcon = SearchX }: DataTableViewMobileProps<TData>) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border-muted shadow-sm">
            <CardContent className="p-0">
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <div className="bg-muted/30 p-3 h-12 flex items-center justify-end px-4 gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <div className="text-center py-12 bg-background rounded-xl shadow-sm border border-muted/60">
        <EmptyStateIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
        <p className="text-muted-foreground font-medium">No {entityName}s found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const visibleCells = row.getVisibleCells();
        const actionCell = visibleCells.find((cell) => cell.column.id === COLUMN_IDS.ACTIONS);
        const selectionCell = visibleCells.find((cell) => cell.column.id === COLUMN_IDS.SELECT);

        // Fields are cells that are not select or actions
        const dataCells = visibleCells.filter((cell) => cell.column.id !== COLUMN_IDS.SELECT && cell.column.id !== COLUMN_IDS.ACTIONS);

        return (
          <Card key={row.id} className="overflow-hidden shadow-sm">
            <CardContent className="py-0 px-4">
              {/* Header / Selection */}
              {selectionCell && (
                <div className="flex items-center gap-3 border-b pb-3 mb-0">
                  {flexRender(selectionCell.column.columnDef.cell, selectionCell.getContext())}
                  <span className="text-xs font-medium text-muted-foreground uppercase">Select Row</span>
                </div>
              )}

              {/* Card Body */}
              <div className="">
                {dataCells.map((cell) => {
                  const header = table.getFlatHeaders().find((h) => h.column.id === cell.column.id);
                  return (
                    <div key={cell.id} className="grid grid-cols-3 text-sm py-3 border-b">
                      <span className="font-medium text-sm">{header && flexRender(cell.column.columnDef.header, header.getContext())}</span>
                      <div className="col-span-2 truncate wrap-break-word overflow-hidden">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </div>
                  );
                })}
              </div>

              {/* Actions Footer */}
              {actionCell && <div className="flex gap-3 justify-center mt-3">{flexRender(actionCell.column.columnDef.cell, actionCell.getContext())}</div>}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
