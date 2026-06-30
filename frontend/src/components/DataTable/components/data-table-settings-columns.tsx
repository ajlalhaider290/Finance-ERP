import { Button } from '@/components/ui';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { memo, useMemo } from 'react';
import { DataTableSettingsColumnsProps } from '../types';

export const DataTableSettingsColumns = memo<DataTableSettingsColumnsProps>(({ columnVisibility, defaultTableConfig, onColumnVisibilityChange, onReset, variant = 'toolbar' }) => {
  const columnSettings = Object.keys(defaultTableConfig.columns).some((key) => {
    const current = columnVisibility[key];
    const defaultVal = defaultTableConfig?.columns[key]?.visible ?? true;
    return current !== undefined ? current !== defaultVal : false;
  });

  const variantClasses = {
    toolbar: 'w-full flex justify-end py-5 border-t',
    popover: 'w-full flex items-center',
  };

  // Column configuration for dropdown
  const columnItems = useMemo(() => {
    return Object.keys(defaultTableConfig.columns).map((key) => ({
      key,
      title: defaultTableConfig.columns[key].title,
    }));
  }, [defaultTableConfig.columns]);

  const getColumnVisibility = (key: string): boolean => {
    const currentValue = columnVisibility[key];
    const defaultValue = defaultTableConfig.columns[key]?.visible;
    return currentValue !== undefined ? currentValue : (defaultValue ?? true);
  };

  return (
    <div className={variantClasses[variant]}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={columnSettings ? 'secondary' : 'outline'} className={cn('w-full justify-between text-xs', variant === 'toolbar' && 'w-40')}>
            Columns
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-4 max-h-80 mr-12 overflow-y-auto">
          <div className="flex items-center justify-between gap-1">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Toggle Columns</h4>
              <p className="text-xs text-muted-foreground">Choose which columns are visible in the table.</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onReset();
              }}
              aria-label="Reset columns">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <DropdownMenuSeparator className="my-3" />
          {columnItems.map(({ key, title }) => (
            <DropdownMenuCheckboxItem
              key={key}
              checked={getColumnVisibility(key)}
              onCheckedChange={(checked) => onColumnVisibilityChange(key, checked)}
              onSelect={(e) => e.preventDefault()}>
              {title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
