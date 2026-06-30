import { DataTableInfinite } from '@/components/DataTable/DataTableInfinite';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableInfiniteQuery } from '@/hooks/data-table/useDataTableInfiniteQuery';

import { memo, useMemo } from 'react';
import JOURNAL_ENTRY_LINE_CONSTANTS from "../../constants";
import { journalEntryLineTableConfigDefault } from '../../data/journalEntryLineTableConfigDefault';
import { JournalEntryLineIndex } from '../../interface';
import { getJournalEntryLines } from '../../service';
import { journalEntryLineGetColumns } from './columns';

interface JournalEntryLineTableProps {
  fixedFilters?: Record<string, unknown>;
  showToolbar?: boolean;
  hiddenActions?: string[];
}

export const JournalEntryLineTable: React.FC<JournalEntryLineTableProps> = memo(({
  fixedFilters,
  showToolbar = true,
  hiddenActions,
}) => {

  const {
    columnVisibility,
    tableHandlers
  } = useDataTableManager(JOURNAL_ENTRY_LINE_CONSTANTS.TABLE_CONFIG_KEY, journalEntryLineTableConfigDefault);

  // 1. Generate columns
  const columns = useMemo(() => journalEntryLineGetColumns(hiddenActions), [hiddenActions]);

  // 2. Manage URL-synced table state and API data fetching (infinite scroll)
  const {
    query: { isFetching, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage },
    flatData,
    totalRowCount,
    tableState: { sorting, onSortingChange },
  } = useDataTableInfiniteQuery({
    queryKey: [JOURNAL_ENTRY_LINE_CONSTANTS.QUERY_KEY, ...(fixedFilters ? [fixedFilters] : [])],
    fetchFn: getJournalEntryLines,
    pageSize: 50,
    filterParsers: {

    },
    overrideParams: fixedFilters,
  });

  // Initial load = fetching with no data yet
  const isInitialLoading = isFetching && flatData.length === 0;

  return (
    <>
      <DataTableInfinite<JournalEntryLineIndex, unknown>
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
        entityName={JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_NAME}
        renderToolbar={showToolbar ? () => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={journalEntryLineTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </> : undefined}
      />
    </>
  );
});

JournalEntryLineTable.displayName = 'JournalEntryLineTable';

export default JournalEntryLineTable;
