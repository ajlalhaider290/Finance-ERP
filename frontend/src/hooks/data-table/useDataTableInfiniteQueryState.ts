import {
    useQueryStates,
    parseAsString,
    Options
} from 'nuqs';
import { useCallback, useMemo } from 'react';
import { SortingState, OnChangeFn, Updater } from '@tanstack/react-table';

type TableStateRecord = Record<string, unknown>;

/**
 * URL parsers for infinite scroll tables — no page/pageSize in URL.
 */
const infiniteTableParsers = {
    sort: parseAsString.withDefault(''),
};

/**
 * URL state management hook for infinite scroll tables.
 * Like useDataTableQueryState but without page/pageSize — those are managed
 * internally by useInfiniteQuery.
 */
export function useDataTableInfiniteQueryState<T extends Record<string, unknown>>(
    filterParsers: T,
    options: Options = { history: 'push', shallow: true },
) {
    const parsers = useMemo(() => ({
        ...infiniteTableParsers,
        ...filterParsers,
    }), [filterParsers]);

    const [state, setState] = useQueryStates(parsers as Parameters<typeof useQueryStates>[0], options);

    const stateRecord = state as TableStateRecord;
    const stateSort = stateRecord.sort as string | undefined;

    // Convert URL sort string to TanStack Table sorting state
    const sorting: SortingState = useMemo(() => {
        if (!stateSort || typeof stateSort !== 'string') return [];

        return stateSort.split(',').map((s: string) => {
            const desc = s.startsWith('-');
            const id = desc ? s.slice(1) : s;
            return { id, desc };
        });
    }, [stateSort]);

    // Handler for TanStack Table sorting change
    const onSortingChange: OnChangeFn<SortingState> = useCallback((updater: Updater<SortingState>) => {
        const nextValue = typeof updater === 'function' ? updater(sorting) : updater;
        const sortString = nextValue
            .map((s) => (s.desc ? `-${s.id}` : s.id))
            .join(',');

        setState({
            sort: sortString || null,
        });
    }, [sorting, setState]);

    // Handler for form filters
    const setFilters = useCallback((filters: Partial<Record<keyof T, unknown>>) => {
        const scrubbedFilters: Record<string, unknown> = { ...filters };
        let hasChanged = false;

        Object.keys(scrubbedFilters).forEach(key => {
            if (scrubbedFilters[key] === '__all__') {
                scrubbedFilters[key] = null;
            }

            if (scrubbedFilters[key] !== stateRecord[key]) {
                hasChanged = true;
            }
        });

        if (hasChanged) {
            setState(scrubbedFilters);
        }
    }, [setState, stateRecord]);

    const resetFilters = useCallback(() => {
        const nullFilters = Object.keys(filterParsers).reduce<Record<string, null>>((acc, key) => {
            acc[key] = null;
            return acc;
        }, {});

        setState({
            ...nullFilters,
            sort: null,
        });
    }, [filterParsers, setState]);

    return {
        state,
        sorting,
        onSortingChange,
        setFilters,
        resetFilters,
    };
}
