import { ColumnDef, ColumnFiltersState, PaginationState, SortingState, VisibilityState, Table, Column, Updater } from '@tanstack/react-table';
import { TableConfig } from '@/types/table';
import { LucideIcon } from 'lucide-react';

export type ColorVariant = 'default' | 'primary' | 'success' | 'destructive' | 'warning';
export type DataTableActionVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type DataTableActionSize = 'default' | 'sm' | 'lg' | 'icon';

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  rowCount: number;
  state?: {
    pagination?: PaginationState;
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    columnVisibility?: VisibilityState;
    rowSelection?: Record<string, boolean>;
  };
  onPaginationChange?: (updater: Updater<PaginationState>) => void;
  onSortingChange?: (updater: Updater<SortingState>) => void;
  onColumnFiltersChange?: (updater: Updater<ColumnFiltersState>) => void;
  onColumnVisibilityChange?: (updater: Updater<VisibilityState>) => void;
  onRowSelectionChange?: (updater: Updater<Record<string, boolean>>) => void;
  isLoading?: boolean;

  // Configuration
  enableMultiSort?: boolean;
  entityName?: string;
  pageSizeOptions?: number[];

  // Custom Toolbar
  renderToolbar?: (table: import('@tanstack/react-table').Table<TData>) => React.ReactNode;
  renderBulkActions?: (table: import('@tanstack/react-table').Table<TData>) => React.ReactNode;

  // Error & Empty States
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  renderEmptyState?: (table: import('@tanstack/react-table').Table<TData>) => React.ReactNode;
};

export type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  totalRows: number;
  pageSizeOptions?: number[];
};

export type DataTableViewMobileProps<TData> = {
  table: Table<TData>;
  isLoading?: boolean;
  entityName?: string;
  emptyStateIcon?: LucideIcon;
};

export type DataTableColumnHeaderProps<TData, TValue> = React.HTMLAttributes<HTMLDivElement> & {
  column: Column<TData, TValue>;
  title: string;
  multiSortEnabled?: boolean;
};

export type SelectedRowActionsProps<TData> = {
  table: Table<TData>;
  entityName?: string;
  renderBulkActions?: (table: Table<TData>) => React.ReactNode;
};

type DataTableActionBaseProps = {
  label?: string;
  title?: string;
  className?: string;
  disabled?: boolean;
  visible?: boolean;
  variant?: DataTableActionVariant;
  colorVariant?: ColorVariant;
  onClick: (event: React.MouseEvent) => void;
  permission?: {
    module: string;
    resource: string;
    action: 'view' | 'edit' | 'delete' | 'add' | 'detail' | 'upload';
  };
};

export type DataTableActionProps = DataTableActionBaseProps & ({ size?: 'icon'; icon: LucideIcon } | { size: 'default' | 'sm' | 'lg'; icon?: LucideIcon });

export type DataTableEmptyStateProps<TData> = {
  columnCount: number;
  entityName?: string;
  table: Table<TData>;
  renderEmptyState?: (table: Table<TData>) => React.ReactNode;
};

export type DataTableErrorProps = {
  columnCount: number;
  message?: string;
  onRetry?: () => void;
};

export type DataTableSkeletonProps = {
  columnCount: number;
  rowCount?: number;
};

export type DataTableViewListProps<TData, TValue> = {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  entityName?: string;
  renderEmptyState?: (table: Table<TData>) => React.ReactNode;
};

export type DataTableSettingsColumnsProps = {
  columnVisibility: Record<string, boolean>;
  defaultTableConfig: TableConfig;
  onColumnVisibilityChange: (key: string, visible: boolean) => void;
  onReset: () => void;
  variant?: 'toolbar' | 'popover';
};

export type TableSettingsProps = {
  // Behavioral states
  autoSearch: boolean;
  multiSort: boolean;
  onAutoSearchChange: (value: boolean) => void;
  onMultiSortChange: (value: boolean) => void;

  // Column configuration (passed to DataTableSettingsColumns)
  columnVisibility: Record<string, boolean>;
  defaultTableConfig: TableConfig;
  onColumnVisibilityChange: (key: string, visible: boolean) => void;
  onReset: () => void;
};

export type DataTableInfiniteProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRowCount: number;
  state?: {
    sorting?: SortingState;
    columnVisibility?: VisibilityState;
    columnFilters?: ColumnFiltersState;
    rowSelection?: Record<string, boolean>;
  };
  onSortingChange?: (updater: Updater<SortingState>) => void;
  onColumnVisibilityChange?: (updater: Updater<VisibilityState>) => void;
  onRowSelectionChange?: (updater: Updater<Record<string, boolean>>) => void;

  // Infinite scroll
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;

  // Loading & error
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;

  // Configuration
  enableMultiSort?: boolean;
  entityName?: string;

  // Custom renders
  renderToolbar?: (table: Table<TData>) => React.ReactNode;
  renderBulkActions?: (table: Table<TData>) => React.ReactNode;
  renderEmptyState?: (table: Table<TData>) => React.ReactNode;
};
