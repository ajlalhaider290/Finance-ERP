import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DataTableColumnHeaderProps } from '../types';

export function DataTableColumnHeader<TData, TValue>({ column, title, className, multiSortEnabled = false }: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sorted = column.getIsSorted();
  const sortIndex = column.getSortIndex();

  const handleSort = (event: React.MouseEvent) => {
    // Check for Ctrl/Cmd key for multi-sort OR if multi-sort is enabled globally
    const forceMultiSort = event.ctrlKey || event.metaKey;
    const useMultiSort = multiSortEnabled || forceMultiSort;

    if (!sorted) {
      // Not sorted → Asc
      column.toggleSorting(false, useMultiSort);
    } else if (sorted === 'asc') {
      // Asc → Desc
      column.toggleSorting(true, useMultiSort);
    } else {
      // Desc → Clear
      column.toggleSorting(undefined, useMultiSort);
    }
  };

  const getSortIcon = () => {
    if (!sorted) {
      return <ArrowUpDown className="w-4 h-4 ml-1 text-muted-foreground" />;
    }

    return (
      <div className="flex items-center ml-1">
        {sorted === 'asc' ? <ArrowUpIcon className="w-4 h-4 text-primary" /> : <ArrowDownIcon className="w-4 h-4 text-primary" />}
        {sortIndex > 0 && <span className="text-xs bg-primary/10 text-primary rounded-full w-4 h-4 flex items-center justify-center ml-1">{sortIndex + 1}</span>}
      </div>
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn('flex items-center cursor-pointer select-none hover:bg-muted/50', className)}
      onClick={handleSort}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSort(e as unknown as React.MouseEvent);
        }
      }}>
      <span>{title}</span>
      {getSortIcon()}
    </div>
  );
}
