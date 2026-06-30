import { DataTableInfinite } from '@/components/DataTable/DataTableInfinite';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableInfiniteQuery } from '@/hooks/data-table/useDataTableInfiniteQuery';

import { memo, useMemo } from 'react';
import INVOICE_DOCUMENT_CONSTANTS from "../../constants";
import { invoiceDocumentTableConfigDefault } from '../../data/invoiceDocumentTableConfigDefault';
import { InvoiceDocumentIndex } from '../../interface';
import { getInvoiceDocuments } from '../../service';
import { invoiceDocumentGetColumns } from './columns';

interface InvoiceDocumentTableProps {
  fixedFilters?: Record<string, unknown>;
  showToolbar?: boolean;
  hiddenActions?: string[];
}

export const InvoiceDocumentTable: React.FC<InvoiceDocumentTableProps> = memo(({
  fixedFilters,
  showToolbar = true,
  hiddenActions,
}) => {

  const {
    columnVisibility,
    tableHandlers
  } = useDataTableManager(INVOICE_DOCUMENT_CONSTANTS.TABLE_CONFIG_KEY, invoiceDocumentTableConfigDefault);

  // 1. Generate columns
  const columns = useMemo(() => invoiceDocumentGetColumns(hiddenActions), [hiddenActions]);

  // 2. Manage URL-synced table state and API data fetching (infinite scroll)
  const {
    query: { isFetching, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage },
    flatData,
    totalRowCount,
    tableState: { sorting, onSortingChange },
  } = useDataTableInfiniteQuery({
    queryKey: [INVOICE_DOCUMENT_CONSTANTS.QUERY_KEY, ...(fixedFilters ? [fixedFilters] : [])],
    fetchFn: getInvoiceDocuments,
    pageSize: 50,
    filterParsers: {

    },
    overrideParams: fixedFilters,
  });

  // Initial load = fetching with no data yet
  const isInitialLoading = isFetching && flatData.length === 0;

  return (
    <>
      <DataTableInfinite<InvoiceDocumentIndex, unknown>
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
        entityName={INVOICE_DOCUMENT_CONSTANTS.ENTITY_NAME}
        renderToolbar={showToolbar ? () => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={invoiceDocumentTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </> : undefined}
      />
    </>
  );
});

InvoiceDocumentTable.displayName = 'InvoiceDocumentTable';

export default InvoiceDocumentTable;
