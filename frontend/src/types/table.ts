import { Action } from "@/config/authAccess";
import { SortDirection } from "@/hooks/useTableOperations";


interface ColumnConfig {
  visible: boolean;
  title: string;
  dataIndex: string;
}

export type TableConfig = {
  autoSearch: boolean;
  multiSort: boolean;
  columns: Record<string, ColumnConfig>;
} | {
  columns: Record<string, ColumnConfig>;
}

export interface TableColumn<T> {
    key: string;
    title: string;
    dataIndex: string;
    sortable?: boolean;
    render?: (value: unknown, record: T) => React.ReactNode;
}

export interface TableAction<T> {
    key: string;
    icon: React.ReactNode | ((record: T) => React.ReactNode);
    onClick: (record: T) => void;
    variant?: 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost' | 'link';
    className?: string;
    iconClassName?: string;
    title?: string;
    visible?: (record: T) => boolean;
    permission?: {
        scope: string;
        module: string;
        resource: string;
        action: Action;
    };
}

export interface SelectionHandlers {
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  isSelected: (id: string) => boolean;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  selectedCount: number;
  clearSelection: () => void;
}

export interface GenericTableProps<T> {
  data: T[];
  isLoading: boolean;
  primaryKeyName: string;
  columns: TableColumn<T>[];
  showPagination: boolean;
  pager: { page: number; pageSize: number };
  setPager: (pager: { page: number; pageSize: number }) => void;
  totalPages: number;
  totalCount?: number;
  openConfigDrawer?: boolean;
  setOpenConfigDrawer?: (open: boolean) => void;
  isConfigModified?: boolean;
  tableConfigKey?: string;
  tableConfiguration?: TableConfig;
  defaultTableConfig?: TableConfig;
  actions?: TableAction<T>[];
  handleDelete?: () => void;
  isDeleteLoading?: boolean;
  user: Record<string, unknown> | null;
  entityName?: string;
  entityKey?: string;
  CreateComponent?: React.ComponentType;
  UpdateComponent?: React.ComponentType;
  handleSort?: (columnKey: string, multiSort?: boolean) => void;
  getSortDirection?: (columnKey: string) => SortDirection | null;
  getSortIndex?: (columnKey: string) => number | null;
  enableSelection?: boolean;
  selectionHandlers?: SelectionHandlers;
}

export type MobileCardsViewProps<T> = Pick<
  GenericTableProps<T>,
  | "data"
  | "isLoading"
  | "columns"
  | "showPagination"
  | "pager"
  | "setPager"
  | "totalPages"
  | "totalCount"
  | "actions"
  | "user"
  | "entityName"
  | "primaryKeyName"
  | "enableSelection"
  | "selectionHandlers"
>;
