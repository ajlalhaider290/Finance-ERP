import { memo, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getWeeksInYear, getWeekStartDate } from '../utils';

interface WeekPickerProps {
  selectedDate?: Date;
  year: number;
  month: number;
  onWeekSelect: (weekStart: Date) => void;
}

// Cache for formatted date strings to avoid repeated toLocaleDateString calls
const dateFormatCache = new Map<string, string>();

const formatDateRange = (startDate: Date, endDate: Date): string => {
  const cacheKey = `${startDate.getTime()}-${endDate.getTime()}`;

  if (dateFormatCache.has(cacheKey)) {
    return dateFormatCache.get(cacheKey)!;
  }

  const formatted = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  dateFormatCache.set(cacheKey, formatted);
  return formatted;
};

/**
 * Optimized WeekPicker component
 * Shows all weeks in the selected year with scrolling
 * Auto-scrolls to the first week of the selected month
 */
export const WeekPicker = memo<WeekPickerProps>(({ selectedDate, year, month, onWeekSelect }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Memoize weeks for the current year
  const weeks = useMemo(() => getWeeksInYear(year), [year]);

  // Get selected week start date for comparison
  const selectedWeekStart = useMemo(() => {
    if (!selectedDate) return null;
    return getWeekStartDate(selectedDate).getTime();
  }, [selectedDate]);

  // Find the index of the first week that contains days from the selected month
  const firstWeekIndexOfMonth = useMemo(() => {
    return weeks.findIndex((week) => {
      const weekStart = week.startDate;
      const weekEnd = week.endDate;
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);
      return weekStart <= monthEnd && weekEnd >= monthStart;
    });
  }, [weeks, year, month]);

  // Pre-format all date ranges to avoid expensive rendering
  const formattedWeeks = useMemo(() => {
    return weeks.map((week, index) => ({
      ...week,
      index,
      dateRange: formatDateRange(week.startDate, week.endDate),
    }));
  }, [weeks]);

  // Auto-scroll to the first week of the selected month when month changes
  // Use requestAnimationFrame instead of setTimeout for better performance
  useEffect(() => {
    if (firstWeekIndexOfMonth !== -1 && scrollContainerRef.current) {
      requestAnimationFrame(() => {
        if (!scrollContainerRef.current) return;

        const targetWeek = scrollContainerRef.current.querySelector(`[data-week-index="${firstWeekIndexOfMonth}"]`) as HTMLElement;
        if (targetWeek) {
          // Use scrollIntoView for smoother, browser-optimized scrolling
          targetWeek.scrollIntoView({ block: 'start', behavior: 'instant' });
        }
      });
    }
  }, [firstWeekIndexOfMonth]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        height: '300px',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}>
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {formattedWeeks.map((week) => {
          const weekStartTime = week.startDate.getTime();
          const isSelected = selectedWeekStart === weekStartTime;

          return (
            <Button
              key={`week-${week.weekNumber}-${week.year}`}
              data-week-index={week.index}
              variant={isSelected ? 'default' : 'ghost'}
              className={cn('w-full justify-start font-normal', isSelected && 'bg-primary text-primary-foreground')}
              onClick={() => onWeekSelect(week.startDate)}>
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">Week {week.weekNumber}</span>
                <span className="text-xs text-muted-foreground">{week.dateRange}</span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
});

WeekPicker.displayName = 'WeekPicker';
