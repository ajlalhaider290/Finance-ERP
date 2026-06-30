import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { DataTableErrorProps } from '../types';

export function DataTableError({ columnCount, message = 'Failed to load data.', onRetry }: DataTableErrorProps) {
  return (
    <TableRow>
      <TableCell colSpan={columnCount} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <div className="flex items-center text-destructive">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span className="font-medium text-sm">{message}</span>
          </div>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry} className="h-8">
              <RefreshCw className="mr-2 h-3 w-3" />
              Retry
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
