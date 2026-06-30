import { TableCell, TableRow } from '@/components/ui/table';
import { DataTableEmptyStateProps } from '../types';

export function DataTableEmptyState<TData>({ columnCount, entityName = 'record', table, renderEmptyState }: DataTableEmptyStateProps<TData>) {
  return (
    <TableRow>
      <TableCell colSpan={columnCount} className="h-24 text-center">
        {renderEmptyState ? renderEmptyState(table) : <span className="text-muted-foreground">No {entityName}s found.</span>}
      </TableCell>
    </TableRow>
  );
}
