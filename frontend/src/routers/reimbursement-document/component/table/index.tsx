import { DataTableInfinite } from '@/components/DataTable/DataTableInfinite';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableInfiniteQuery } from '@/hooks/data-table/useDataTableInfiniteQuery';

import { memo, useMemo } from 'react';
import REIMBURSEMENT_DOCUMENT_CONSTANTS from "../../constants";
import { reimbursementDocumentTableConfigDefault } from '../../data/reimbursementDocumentTableConfigDefault';
import { ReimbursementDocumentIndex } from '../../interface';
import { getReimbursementDocuments } from '../../service';
import { reimbursementDocumentGetColumns } from './columns';

interface ReimbursementDocumentTableProps {
  fixedFilters?: Record<string, unknown>;
  showToolbar?: boolean;
  hiddenActions?: string[];
}

export const ReimbursementDocumentTable: React.FC<ReimbursementDocumentTableProps> = memo(({
  fixedFilters,
  showToolbar = true,
  hiddenActions,
}) => {

  const {
    columnVisibility,
    tableHandlers
  } = useDataTableManager(REIMBURSEMENT_DOCUMENT_CONSTANTS.TABLE_CONFIG_KEY, reimbursementDocumentTableConfigDefault);

  // 1. Generate columns
  const columns = useMemo(() => reimbursementDocumentGetColumns(hiddenActions), [hiddenActions]);

  // 2. Manage URL-synced table state and API data fetching (infinite scroll)
  const {
    query: { isFetching, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage },
    flatData,
    totalRowCount,
    tableState: { sorting, onSortingChange },
  } = useDataTableInfiniteQuery({
    queryKey: [REIMBURSEMENT_DOCUMENT_CONSTANTS.QUERY_KEY, ...(fixedFilters ? [fixedFilters] : [])],
    fetchFn: getReimbursementDocuments,
    pageSize: 50,
    filterParsers: {

    },
    overrideParams: fixedFilters,
  });

  // Initial load = fetching with no data yet
  const isInitialLoading = isFetching && flatData.length === 0;

  return (
    <>
      <DataTableInfinite<ReimbursementDocumentIndex, unknown>
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
        entityName={REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME}
        renderToolbar={showToolbar ? () => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={reimbursementDocumentTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </> : undefined}
      />
    </>
  );
});

ReimbursementDocumentTable.displayName = 'ReimbursementDocumentTable';

export default ReimbursementDocumentTable;
