import { useState, useCallback, useMemo, useEffect } from 'react';

interface UseTableSelectionProps<T> {
  data: T[];
  primaryKeyName: keyof T;
  enabled?: boolean;
}

interface UseTableSelectionReturn {
  selectedIds: Set<string>;
  selectedCount: number;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  isSelected: (id: string) => boolean;
  clearSelection: () => void;
  getSelectedIds: () => string[];
}

export const useTableSelection = <T extends Record<string, unknown>>({
  data,
  primaryKeyName,
  enabled = false,
}: UseTableSelectionProps<T>): UseTableSelectionReturn => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Clear selection when data changes (pagination, filtering)
  useEffect(() => {
    setSelectedIds(new Set());
  }, [data]);

  const currentPageIds = useMemo(
    () => new Set(data.map((item) => String(item[primaryKeyName]))),
    [data, primaryKeyName]
  );

  const isAllSelected = useMemo(
    () => enabled && data.length > 0 && data.every((item) => selectedIds.has(String(item[primaryKeyName]))),
    [enabled, data, selectedIds, primaryKeyName]
  );

  const isPartiallySelected = useMemo(
    () => enabled && selectedIds.size > 0 && !isAllSelected,
    [enabled, selectedIds.size, isAllSelected]
  );

  const onSelectAll = useCallback(
    (checked: boolean) => {
      if (!enabled) return;

      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          data.forEach((item) => newSet.add(String(item[primaryKeyName])));
        } else {
          data.forEach((item) => newSet.delete(String(item[primaryKeyName])));
        }
        return newSet;
      });
    },
    [enabled, data, primaryKeyName]
  );

  const onSelectRow = useCallback(
    (id: string, checked: boolean) => {
      if (!enabled) return;

      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });
    },
    [enabled]
  );

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const getSelectedIds = useCallback(
    () => Array.from(selectedIds).filter((id) => currentPageIds.has(id)),
    [selectedIds, currentPageIds]
  );

  return {
    selectedIds,
    selectedCount: selectedIds.size,
    isAllSelected,
    isPartiallySelected,
    onSelectAll,
    onSelectRow,
    isSelected,
    clearSelection,
    getSelectedIds,
  };
};
