import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

type ThrottledFn = (() => void) & { cancel: () => void };

function throttle(fn: () => void, wait: number): ThrottledFn {
  let lastCall = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const throttled = (() => {
    const now = Date.now();
    const remaining = wait - (now - lastCall);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCall = now;
      fn();
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now();
        timer = null;
        fn();
      }, remaining);
    }
  }) as ThrottledFn;
  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastCall = 0;
  };
  return throttled;
}
import { useEffect, useMemo, useRef, useState } from 'react';
import { SelectedRowActionsProps } from '../../types';

export function SelectedRowActions<TData>({ table, entityName = 'records', renderBulkActions }: SelectedRowActionsProps<TData>) {
  const [isFixed, setIsFixed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          // Header height is 64px (h-16)
          const shouldBeFixed = rect.top <= 0;
          setIsFixed(shouldBeFixed);
          if (shouldBeFixed) {
            setStyle({
              width: rect.width,
              left: rect.left,
            });
          } else {
            setStyle({});
          }
        }
      }, 100),
    [],
  );

  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll, selectedRowCount]);

  return (
    <AnimatePresence>
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div ref={containerRef} className="relative w-full mb-4 min-h-[74px]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              'flex flex-col md:flex-row gap-2 items-center justify-between p-4 rounded-lg border border-muted bg-background shadow-md',
              isFixed ? 'fixed top-0 z-50 transition-none' : 'relative w-full',
            )}
            style={style}>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => table.resetRowSelection()} className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
                <X className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {table.getFilteredSelectedRowModel().rows.length} {entityName}(s) selected
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2">{renderBulkActions && renderBulkActions(table)}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
