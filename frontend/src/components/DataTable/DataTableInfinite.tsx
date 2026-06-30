import { ColumnFiltersState, getCoreRowModel, useReactTable, VisibilityState } from '@tanstack/react-table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { DataTableInfiniteProps } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
import { DataTableViewMobile } from './components/data-table-mobile';
import { SelectedRowActions } from './components/actions/selected-row-actions';
import { DataTableViewList } from './components/data-table-view-list';

export function DataTableInfinite<TData, TValue>({
  columns,
  data,
  totalRowCount,
  state,
  onSortingChange,
  onColumnVisibilityChange,
  onRowSelectionChange,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  enableMultiSort = false,
  entityName,
  renderToolbar,
  renderBulkActions,
  renderEmptyState,
}: DataTableInfiniteProps<TData, TValue>) {
  const isMobile = useIsMobile();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Internal states if not provided via props
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<VisibilityState>(state?.columnVisibility || {});
  const [internalRowSelection, setInternalRowSelection] = useState<Record<string, boolean>>(state?.rowSelection || {});
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>(state?.columnFilters || []);

  const actualColumnVisibility = state?.columnVisibility ?? internalColumnVisibility;
  const onActualColumnVisibilityChange = onColumnVisibilityChange ?? setInternalColumnVisibility;

  const actualRowSelection = state?.rowSelection ?? internalRowSelection;
  const onActualRowSelectionChange = useCallback(
    (updater: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => {
      if (onRowSelectionChange) {
        onRowSelectionChange(updater);
      } else {
        setInternalRowSelection(updater);
      }
    },
    [onRowSelectionChange],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: state?.sorting || [],
      columnVisibility: actualColumnVisibility,
      rowSelection: actualRowSelection,
      columnFilters: internalColumnFilters,
    },
    onSortingChange,
    onColumnVisibilityChange: onActualColumnVisibilityChange,
    onRowSelectionChange: onActualRowSelectionChange,
    onColumnFiltersChange: setInternalColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualFiltering: true,
    enableRowSelection: true,
    enableMultiSort,
    defaultColumn: {
      enableSorting: false,
    },
  });

  // Reset selection when sort or filters change (NOT on load-more)
  useEffect(() => {
    onActualRowSelectionChange({});
  }, [state?.sorting, internalColumnFilters, onActualRowSelectionChange]);

  // IntersectionObserver on sentinel to trigger loading next page
  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px', threshold: 0.1 },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="relative">
      {renderToolbar && renderToolbar(table)}

      <SelectedRowActions table={table} entityName={entityName} renderBulkActions={renderBulkActions} />

      <div className="mb-5">
        {isMobile ? (
          <DataTableViewMobile table={table} isLoading={isLoading} entityName={entityName} />
        ) : (
          <DataTableViewList
            table={table}
            columns={columns}
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage}
            onRetry={onRetry}
            entityName={entityName}
            renderEmptyState={renderEmptyState}
          />
        )}
      </div>

      {/* Sentinel element + loading/status indicators */}
      <div ref={sentinelRef} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading more...
          </div>
        )}
      </div>

      {/* Footer status */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{data.length > 0 && `Showing ${data.length} of ${totalRowCount} records`}</span>
        {!hasNextPage && data.length > 0 && <span>All records loaded</span>}
      </div>
    </div>
  );
}
