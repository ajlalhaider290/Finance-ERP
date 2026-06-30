import {
    useQueryStates,
    parseAsInteger,
    parseAsString,
    Options
} from 'nuqs';
import { useCallback, useMemo } from 'react';
import { PaginationState, SortingState, OnChangeFn, Updater } from '@tanstack/react-table';

type TableStateRecord = Record<string, unknown>;

/**
 * Common parsers for table state
 */
export const commonTableParsers = {
    page: parseAsInteger.withDefault(0),
    pageSize: parseAsInteger.withDefault(10),
    sort: parseAsString.withDefault(''),
};

/**
 * Reusable hook to sync DataTable state with URL query strings using nuqs.
**/
export function useDataTableQueryState<T extends Record<string, unknown>>(
    filterParsers: T,
    options: Options = { history: 'push', shallow: true },
    defaultPageSize: number = 10
) {
    // Combine common parsers with module-specific filters
    const parsers = useMemo(() => ({
        ...commonTableParsers,
        pageSize: parseAsInteger.withDefault(defaultPageSize),
        ...filterParsers,
    }), [filterParsers, defaultPageSize]);

    const [state, setState] = useQueryStates(parsers as Parameters<typeof useQueryStates>[0], options);

    const stateRecord = state as TableStateRecord;
    const statePage = stateRecord.page as number | undefined;
    const statePageSize = stateRecord.pageSize as number | undefined;
    const stateSort = stateRecord.sort as string | undefined;

    // Helper to convert URL state to TanStack Table pagination state
    const pagination: PaginationState = useMemo(() => ({
        pageIndex: statePage ?? 0,
        pageSize: statePageSize ?? defaultPageSize,
    }), [statePage, statePageSize, defaultPageSize]);

    // Helper to convert URL sort string to TanStack Table sorting state
    const sorting: SortingState = useMemo(() => {
        if (!stateSort || typeof stateSort !== 'string') return [];

        return stateSort.split(',').map((s: string) => {
            const desc = s.startsWith('-');
            const id = desc ? s.slice(1) : s;
            return { id, desc };
        });
    }, [stateSort]);

    // Handler for TanStack Table pagination change
    const onPaginationChange: OnChangeFn<PaginationState> = useCallback((updater: Updater<PaginationState>) => {
        const nextValue = typeof updater === 'function' ? updater(pagination) : updater;

        // When changing page, we also want to ensure no "__all__" values are left in the URL
        const scrubbedState: Record<string, unknown> = {
            page: nextValue.pageIndex,
            pageSize: nextValue.pageSize,
        };

        // If there are any current filters that are "__all__", we set them to null during pagination change
        Object.keys(state).forEach(key => {
            if (stateRecord[key] === '__all__') {
                scrubbedState[key] = null;
            }
        });

        setState(scrubbedState);
    }, [pagination, setState, state, stateRecord]);

    // Handler for TanStack Table sorting change
    const onSortingChange: OnChangeFn<SortingState> = useCallback((updater: Updater<SortingState>) => {
        const nextValue = typeof updater === 'function' ? updater(sorting) : updater;
        const sortString = nextValue
            .map((s) => (s.desc ? `-${s.id}` : s.id))
            .join(',');

        setState({
            sort: sortString || null,
            page: 0, // Reset to first page on sort change
        });
    }, [sorting, setState]);

    // Handler for form filters
    const setFilters = useCallback((filters: Partial<Record<keyof T, unknown>>) => {
        const scrubbedFilters: Record<string, unknown> = { ...filters };
        let hasChanged = false;

        // 1. Scrub "__all__" values (convert to null)
        // 2. Check if anything actually changed compared to current state
        Object.keys(scrubbedFilters).forEach(key => {
            if (scrubbedFilters[key] === '__all__') {
                scrubbedFilters[key] = null;
            }

            if (scrubbedFilters[key] !== stateRecord[key]) {
                hasChanged = true;
            }
        });

        // Only update state if there's a real change
        if (hasChanged) {
            setState({
                ...scrubbedFilters,
                page: 0, // Reset to first page only on real filter change
            });
        }
    }, [setState, stateRecord]);

    const resetFilters = useCallback(() => {
        const nullFilters = Object.keys(filterParsers).reduce<Record<string, null>>((acc, key) => {
            acc[key] = null;
            return acc;
        }, {});

        setState({
            ...nullFilters,
            page: 0,
            sort: null,
        });
    }, [filterParsers, setState]);

    return {
        state,
        pagination,
        sorting,
        onPaginationChange,
        onSortingChange,
        setFilters,
        resetFilters,
    };
}
