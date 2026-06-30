import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setTableConfiguration } from '@/store/slice/tableConfigurationSlice';
import { CACHE_TOKEN } from '@/config/app';
import { isEmpty } from 'lodash';

// Hook to initialize AND retrieve table configuration
export function useTableConfig(tableKey: string, tableConfigDefault: Record<string, unknown>) {
    const dispatch = useAppDispatch();
    const tableConfiguration = useAppSelector((state) => state.tableConfiguration[tableKey] || {});

    // Side-effect: Initialize if missing
    useEffect(() => {
        if (!tableKey) return;
        if (isEmpty(tableConfiguration) || tableConfiguration.token !== CACHE_TOKEN) {
            dispatch(
                setTableConfiguration({
                    name: tableKey,
                    data: { ...tableConfigDefault, token: CACHE_TOKEN },
                }),
            );
        }
    }, [tableConfiguration, dispatch, tableKey, tableConfigDefault]);

    // Return effective config (defaults merged with Redux state if needed, though Redux usually wins)
    // We prioritize the Redux state if it exists, otherwise fall back to default
    return !isEmpty(tableConfiguration) ? tableConfiguration : tableConfigDefault;
}