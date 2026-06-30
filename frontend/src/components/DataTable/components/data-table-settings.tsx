import { Switch } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { motion, useAnimation } from 'framer-motion';
import { RotateCcw, Settings } from 'lucide-react';
import { memo, useCallback, useMemo } from 'react';
import { TableSettingsProps } from '../types';
import { DataTableSettingsColumns } from './data-table-settings-columns';

export const TableSettings = memo<TableSettingsProps>(
  ({ autoSearch, multiSort, onAutoSearchChange, onMultiSortChange, columnVisibility, defaultTableConfig, onColumnVisibilityChange, onReset }) => {
    const controls = useAnimation();

    const columnSettings = useMemo(() => {
      return Object.keys(defaultTableConfig.columns).some((key) => {
        const current = columnVisibility[key];
        const default_val = defaultTableConfig?.columns[key]?.visible ?? true;
        return current !== undefined ? current !== default_val : false;
      });
    }, [columnVisibility, defaultTableConfig]);

    const handleSettingsClick = useCallback(async () => {
      await controls.start({ rotate: 360, transition: { duration: 0.5, ease: 'easeInOut' } });
      controls.set({ rotate: 0 });
    }, [controls]);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button size={'icon'} variant={autoSearch || multiSort || columnSettings ? 'default' : 'outline'} onClick={handleSettingsClick} className={'flex text-sm'}>
            <motion.div whileHover={{ rotate: 90 }} whileTap={{ rotate: 180 }} animate={controls} className="flex">
              <Settings className={`size-4 ${autoSearch ? 'text-primary-foreground' : ''}`} />
            </motion.div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 mr-12 p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between gap-1">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Table settings</h4>
              <p className="text-xs text-muted-foreground">
                {autoSearch ? 'Auto search is enabled. Results update as you type.' : 'Manual search is enabled. Click the search button to get results.'}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onReset();
              }}
              aria-label="Reset table settings">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <Separator />

          {/* Behaviour section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">Auto search</p>
                <p className="text-xs text-muted-foreground">Run search automatically when filters or query change.</p>
              </div>
              <Switch id="autoSearch" checked={autoSearch} onCheckedChange={onAutoSearchChange} />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">Multi sort</p>
                <p className="text-xs text-muted-foreground">Allow sorting by more than one column at a time.</p>
              </div>
              <Switch id="multiSort" checked={multiSort} onCheckedChange={onMultiSortChange} />
            </div>

            <p className="text-[11px] text-muted-foreground">
              {multiSort ? 'Multi-sort is enabled – click columns to build sort combinations.' : 'Single-sort mode – only the latest column sort applies.'}
            </p>
          </div>

          <Separator />

          {/* Columns section */}
          <div className="space-y-2">
            <DataTableSettingsColumns
              columnVisibility={columnVisibility}
              defaultTableConfig={defaultTableConfig}
              onColumnVisibilityChange={onColumnVisibilityChange}
              onReset={onReset}
              variant="popover"
            />
            <p className="text-[11px] text-muted-foreground">Choose which columns are visible in the table.</p>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
