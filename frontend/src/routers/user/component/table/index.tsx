import { DataTableInfinite } from '@/components/DataTable/DataTableInfinite';
import { DataTableSettingsColumns } from '@/components/DataTable/components/data-table-settings-columns';
import { useDataTableManager } from '@/hooks/data-table/useDataTableManager';
import { useDataTableInfiniteQuery } from '@/hooks/data-table/useDataTableInfiniteQuery';

import { memo, useMemo } from 'react';
import USER_CONSTANTS from "../../constants";
import { userTableConfigDefault } from '../../data/userTableConfigDefault';
import { UserIndex } from '../../interface';
import { getUsers } from '../../service';
import { userGetColumns } from './columns';

interface UserTableProps {
  fixedFilters?: Record<string, unknown>;
  showToolbar?: boolean;
  hiddenActions?: string[];
}

export const UserTable: React.FC<UserTableProps> = memo(({
  fixedFilters,
  showToolbar = true,
  hiddenActions,
}) => {

  const {
    columnVisibility,
    tableHandlers
  } = useDataTableManager(USER_CONSTANTS.TABLE_CONFIG_KEY, userTableConfigDefault);

  // 1. Generate columns
  const columns = useMemo(() => userGetColumns(hiddenActions), [hiddenActions]);

  // 2. Manage URL-synced table state and API data fetching (infinite scroll)
  const {
    query: { isFetching, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage },
    flatData,
    totalRowCount,
    tableState: { sorting, onSortingChange },
  } = useDataTableInfiniteQuery({
    queryKey: [USER_CONSTANTS.QUERY_KEY, ...(fixedFilters ? [fixedFilters] : [])],
    fetchFn: getUsers,
    pageSize: 50,
    filterParsers: {

    },
    overrideParams: fixedFilters,
  });

  // Initial load = fetching with no data yet
  const isInitialLoading = isFetching && flatData.length === 0;

  return (
    <>
      <DataTableInfinite<UserIndex, unknown>
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
        entityName={USER_CONSTANTS.ENTITY_NAME}
        renderToolbar={showToolbar ? () => <>
          {/* No Search form only Column Config */}
          <DataTableSettingsColumns
            variant="toolbar"
            columnVisibility={columnVisibility}
            defaultTableConfig={userTableConfigDefault}
            onColumnVisibilityChange={tableHandlers.onColumnToggle}
            onReset={tableHandlers.onReset}
          />
        </> : undefined}
      />
    </>
  );
});

UserTable.displayName = 'UserTable';

export default UserTable;
