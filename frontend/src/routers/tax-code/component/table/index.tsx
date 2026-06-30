import { DataTableInfinite } from '@/components/DataTable/DataTableInfinite';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableInfiniteQuery } from '@/hooks/data-table/useDataTableInfiniteQuery';

import { memo, useMemo } from 'react';
import TAX_CODE_CONSTANTS from "../../constants";
import { taxCodeTableConfigDefault } from '../../data/taxCodeTableConfigDefault';
import { TaxCodeIndex } from '../../interface';
import { getTaxCodes } from '../../service';
import { taxCodeGetColumns } from './columns';

interface TaxCodeTableProps {
  fixedFilters?: Record<string, unknown>;
  showToolbar?: boolean;
  hiddenActions?: string[];
}

export const TaxCodeTable: React.FC<TaxCodeTableProps> = memo(({
  fixedFilters,
  showToolbar = true,
  hiddenActions,
}) => {

  const {
    columnVisibility,
    tableHandlers
  } = useDataTableManager(TAX_CODE_CONSTANTS.TABLE_CONFIG_KEY, taxCodeTableConfigDefault);

  // 1. Generate columns
  const columns = useMemo(() => taxCodeGetColumns(hiddenActions), [hiddenActions]);

  // 2. Manage URL-synced table state and API data fetching (infinite scroll)
  const {
    query: { isFetching, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage },
    flatData,
    totalRowCount,
    tableState: { sorting, onSortingChange },
  } = useDataTableInfiniteQuery({
    queryKey: [TAX_CODE_CONSTANTS.QUERY_KEY, ...(fixedFilters ? [fixedFilters] : [])],
    fetchFn: getTaxCodes,
    pageSize: 50,
    filterParsers: {

    },
    overrideParams: fixedFilters,
  });

  // Initial load = fetching with no data yet
  const isInitialLoading = isFetching && flatData.length === 0;

  return (
    <>
      <DataTableInfinite<TaxCodeIndex, unknown>
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
        entityName={TAX_CODE_CONSTANTS.ENTITY_NAME}
        renderToolbar={showToolbar ? () => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={taxCodeTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </> : undefined}
      />
    </>
  );
});

TaxCodeTable.displayName = 'TaxCodeTable';

export default TaxCodeTable;
