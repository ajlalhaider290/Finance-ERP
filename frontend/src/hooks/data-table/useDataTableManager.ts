import { useMemo, useCallback } from 'react';
import { useAppDispatch } from '@/store';
import { setTableConfiguration, updateTableSetting } from '@/store/slice/tableConfigurationSlice';
import { TableConfig } from '@/types/table';
import { useTableConfig } from './useDataTableConfig';

/**
 * useDataTableManager
 * 
 * A specialized hook that manages the lifecycle of a DataTable's configuration.
 * It handles syncing with Redux, mapping internal states to UI-compatible formats (like TanStack visibility),
 * and providing standardized event handlers.
 */
export function useDataTableManager(tableKey: string, defaultConfig: TableConfig) {
    const dispatch = useAppDispatch();
    const tableConfiguration = useTableConfig(tableKey, defaultConfig);

    // 1. Map Redux Columns (TableConfig format) to TanStack Visibility State (Record<string, boolean>)
    const columnVisibility = useMemo(() => {
        const visibility: Record<string, boolean> = {};
        const reduxColumns = tableConfiguration?.columns || {};
        Object.keys(reduxColumns).forEach((key) => {
            visibility[key] = reduxColumns[key].visible ?? true;
        });
        return visibility;
    }, [tableConfiguration?.columns]);

    // 2. Handlers (Memoized to prevent unnecessary re-renders of children)

    // Handles column visibility updates from TanStack or custom toggles
    const handleColumnVisibilityChange = useCallback((updaterOrValue: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => {
        const currentVisibility = columnVisibility;
        const newVisibility = typeof updaterOrValue === 'function'
            ? updaterOrValue(currentVisibility)
            : updaterOrValue;

        const updatedColumns = { ...tableConfiguration.columns };
        Object.keys(newVisibility).forEach((key) => {
            updatedColumns[key] = {
                ...updatedColumns[key],
                visible: newVisibility[key],
            };
        });

        dispatch(setTableConfiguration({
            name: tableKey,
            data: { ...tableConfiguration, columns: updatedColumns },
        }));
    }, [dispatch, tableKey, tableConfiguration, columnVisibility]);

    // Handles behavioral toggles (Auto Search) using stable partial updates
    const handleAutoSearchChange = useCallback((value: boolean) => {
        dispatch(updateTableSetting({
            name: tableKey,
            setting: 'autoSearch',
            value: value
        }));
    }, [dispatch, tableKey]);

    // Handles behavioral toggles (Multi Sort) using stable partial updates
    const handleMultiSortChange = useCallback((value: boolean) => {
        dispatch(updateTableSetting({
            name: tableKey,
            setting: 'multiSort',
            value: value
        }));
    }, [dispatch, tableKey]);

    // Resets the table to project defaults
    const handleReset = useCallback(() => {
        dispatch(setTableConfiguration({
            name: tableKey,
            data: defaultConfig,
        }));
    }, [dispatch, tableKey, defaultConfig]);

    // Handles single column toggles (useful for simple checkbox UI)
    const handleColumnToggle = useCallback((key: string, visible: boolean) => {
        handleColumnVisibilityChange({ [key]: visible });
    }, [handleColumnVisibilityChange]);

    return {
        tableConfiguration,
        columnVisibility,
        tableHandlers: {
            onColumnVisibilityChange: handleColumnVisibilityChange,
            onColumnToggle: handleColumnToggle,
            onAutoSearchChange: handleAutoSearchChange,
            onMultiSortChange: handleMultiSortChange,
            onReset: handleReset,
        },
    };
}
