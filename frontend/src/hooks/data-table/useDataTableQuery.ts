import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Options } from 'nuqs';
import { useMemo } from 'react';
import { useDataTableQueryState } from './useDataTableQueryState';

interface UseDataTableQueryProps<TFilters extends Record<string, unknown>, TData> {
    queryKey: unknown[];
    fetchFn: (params: Record<string, unknown>) => Promise<TData>;
    filterParsers: TFilters;
    nuqsOptions?: Options;
    queryOptions?: Partial<UseQueryOptions<TData>>;
    defaultPageSize?: number;
    overrideParams?: Record<string, unknown>;
}

/**
 * useDataTableQuery
 *
 * A high-level hook that combines URL state management (nuqs) with
 * API data fetching (React Query). It automatically handles the mapping
 * between URL parameters and API request parameters.
 */
export function useDataTableQuery<TFilters extends Record<string, unknown>, TData>({
    queryKey,
    fetchFn,
    filterParsers,
    nuqsOptions,
    queryOptions,
    defaultPageSize,
    overrideParams
}: UseDataTableQueryProps<TFilters, TData>) {

    // 1. Sync URL state with local table state
    const tableState = useDataTableQueryState(filterParsers, nuqsOptions, defaultPageSize);
    const { state } = tableState;

    // 2. Automatically derive query parameters for the API
    const queryParams = useMemo(() => {
        const params: Record<string, unknown> = { ...state, ...overrideParams };

        // Scrub "__all__" or null values as they indicate no filter should be applied
        Object.keys(params).forEach(key => {
            if (params[key] === '__all__' || params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        });

        return params;
    }, [state, overrideParams]);

    // 3. Fetch data using React Query
    const query = useQuery({
        queryKey: [...queryKey, 'list', queryParams, fetchFn],
        queryFn: () => fetchFn(queryParams),
        enabled: Boolean(queryParams),
        staleTime: 30000,
        ...queryOptions,
    });

    return {
        query,
        tableState,
        queryParams,
    };
}
