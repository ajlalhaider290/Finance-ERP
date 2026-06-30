import { ColumnFiltersState, getCoreRowModel, useReactTable, VisibilityState } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DataTableProps } from './types';
import { DataTablePagination } from './components/data-table-pagination';
import { useIsMobile } from '@/hooks/use-mobile';
import { DataTableViewMobile } from './components/data-table-mobile';
import { SelectedRowActions } from './components/actions/selected-row-actions';
import { DataTableViewList } from './components/data-table-view-list';

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  rowCount,
  state,
  onPaginationChange,
  onSortingChange,
  onColumnFiltersChange,
  onColumnVisibilityChange,
  onRowSelectionChange,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  enableMultiSort = false,
  entityName,
  pageSizeOptions,
  renderToolbar,
  renderBulkActions,
  renderEmptyState,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();

  // Internal states if not provided via props
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<VisibilityState>(state?.columnVisibility || {});
  const [internalRowSelection, setInternalRowSelection] = useState<Record<string, boolean>>(state?.rowSelection || {});
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>(state?.columnFilters || []);

  // Helper to get active state and handler
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

  const actualColumnFilters = state?.columnFilters ?? internalColumnFilters;
  const onActualColumnFiltersChange = onColumnFiltersChange ?? setInternalColumnFilters;

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      ...state,
      columnVisibility: actualColumnVisibility,
      rowSelection: actualRowSelection,
      columnFilters: actualColumnFilters,
      pagination: state?.pagination || { pageIndex: 0, pageSize: 10 },
      sorting: state?.sorting || [],
    },
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange: onActualColumnFiltersChange,
    onColumnVisibilityChange: onActualColumnVisibilityChange,
    onRowSelectionChange: onActualRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableRowSelection: true,
    enableMultiSort: enableMultiSort,
    defaultColumn: {
      enableSorting: false, // Disable sorting by default, only enable when explicitly set to true
    },
  });

  // Reset selection when pagination, sorting, or filters change.
  // Depend on a stable key derived from primitives + serialised filters so a
  // parent refetch that returns a new `data` array reference does not clear
  // the selection.
  const resetSelectionKey = useMemo(
    () => JSON.stringify([state?.pagination?.pageIndex, state?.pagination?.pageSize, state?.sorting, actualColumnFilters]),
    [state?.pagination?.pageIndex, state?.pagination?.pageSize, state?.sorting, actualColumnFilters],
  );
  useEffect(() => {
    onActualRowSelectionChange({});
    // onActualRowSelectionChange is treated as a stable setter — intentionally omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSelectionKey]);

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
      <DataTablePagination table={table} totalRows={rowCount} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}
