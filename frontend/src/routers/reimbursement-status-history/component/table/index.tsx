import { DataTableInfinite } from '@/components/DataTable/DataTableInfinite';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableInfiniteQuery } from '@/hooks/data-table/useDataTableInfiniteQuery';

import { memo, useMemo } from 'react';
import REIMBURSEMENT_STATUS_HISTORY_CONSTANTS from "../../constants";
import { reimbursementStatusHistoryTableConfigDefault } from '../../data/reimbursementStatusHistoryTableConfigDefault';
import { ReimbursementStatusHistoryIndex } from '../../interface';
import { getReimbursementStatusHistories } from '../../service';
import { reimbursementStatusHistoryGetColumns } from './columns';

interface ReimbursementStatusHistoryTableProps {
  fixedFilters?: Record<string, unknown>;
  showToolbar?: boolean;
  hiddenActions?: string[];
}

export const ReimbursementStatusHistoryTable: React.FC<ReimbursementStatusHistoryTableProps> = memo(({
  fixedFilters,
  showToolbar = true,
  hiddenActions,
}) => {

  const {
    columnVisibility,
    tableHandlers
  } = useDataTableManager(REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.TABLE_CONFIG_KEY, reimbursementStatusHistoryTableConfigDefault);

  // 1. Generate columns
  const columns = useMemo(() => reimbursementStatusHistoryGetColumns(hiddenActions), [hiddenActions]);

  // 2. Manage URL-synced table state and API data fetching (infinite scroll)
  const {
    query: { isFetching, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage },
    flatData,
    totalRowCount,
    tableState: { sorting, onSortingChange },
  } = useDataTableInfiniteQuery({
    queryKey: [REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.QUERY_KEY, ...(fixedFilters ? [fixedFilters] : [])],
    fetchFn: getReimbursementStatusHistories,
    pageSize: 50,
    filterParsers: {

    },
    overrideParams: fixedFilters,
  });

  // Initial load = fetching with no data yet
  const isInitialLoading = isFetching && flatData.length === 0;

  return (
    <>
      <DataTableInfinite<ReimbursementStatusHistoryIndex, unknown>
        data={flatData}
        columns={columns}
        totalRowCount={totalRowCount}
        state={{
          sorting,
          columnVisibility,
        }}
        onSortingChange={onSortingChange}
        onColumnVisibilityChange={tableHandlers.onColumnVisibilityChange}
        isLoading={isInitialLoading}
        isError={isError}
        errorMessage={error instanceof Error ? error.message : undefined}
        onRetry={refetch}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        enableMultiSort={false}
        entityName={REIMBURSEMENT_STATUS_HISTORY_CONSTANTS.ENTITY_NAME}
        renderToolbar={showToolbar ? () => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={reimbursementStatusHistoryTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </> : undefined}
      />
    </>
  );
});

ReimbursementStatusHistoryTable.displayName = 'ReimbursementStatusHistoryTable';

export default ReimbursementStatusHistoryTable;
