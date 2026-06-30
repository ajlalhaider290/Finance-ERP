import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setTableConfiguration } from '@/store/slice/tableConfigurationSlice';

interface TableConfigWithMetadata {
  autoSearch?: boolean;
  multiSort?: boolean;
  columns: Record<string, { visible: boolean; title: string }>;
}

interface TableConfigurationDrawerProps {
  nameSpace: string;
  tableConfigDefault: TableConfigWithMetadata;
  tableKey: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TableConfigurationDrawer = ({ tableConfigDefault, tableKey, title, open, setOpen }: TableConfigurationDrawerProps) => {
  const dispatch = useAppDispatch();
  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[tableKey] || {});

  const columnItems = useMemo(() => {
    return Object.keys(tableConfigDefault.columns).map((key) => ({
      key,
      title: tableConfigDefault.columns[key].title,
    }));
  }, [tableConfigDefault]);

  const handleReset = () => {
    dispatch(setTableConfiguration({ name: tableKey, data: tableConfigDefault as unknown as Record<string, unknown> }));
  };

  const handleToggle = (key: string, val: boolean) => {
    const config = tableConfiguration as TableConfigWithMetadata;

    dispatch(
      setTableConfiguration({
        name: tableKey,
        data: {
          ...config,
          columns: {
            ...config.columns,
            [key]: { ...config.columns[key], visible: val },
          },
        },
      }),
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>Customize your table by turning columns on or off.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 pb-4">
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {columnItems.map(({ key, title }) => (
              <div key={key} className="flex items-center justify-between gap-x-2">
                <Label htmlFor={`switch-${key}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {title}
                </Label>
                <Switch
                  id={`switch-${key}`}
                  checked={(() => {
                    const config = tableConfiguration as TableConfigWithMetadata;
                    const currentValue = config.columns?.[key]?.visible;
                    const defaultValue = tableConfigDefault.columns[key]?.visible;
                    return currentValue !== undefined ? currentValue : defaultValue;
                  })()}
                  onCheckedChange={(val) => handleToggle(key, val)}
                />
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TableConfigurationDrawer;
