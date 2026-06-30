import { memo, useMemo } from 'react';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useDatePicker } from './hooks/useDatePicker';
import { DatePickerProps } from './types';
import { formatDateDisplay } from './utils';
import { TimePicker } from './components/TimePicker';
import { WeekPicker } from './components/WeekPicker';
import { MonthPicker } from './components/MonthPicker';

import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { OPERATOR_OPTIONS } from '@/enums/operator';

/**
 * Highly optimized, all-in-one DatePicker component
 * Supports multiple modes: date, datetime, week, month
 * Implements React best practices with memoization and performance optimization
 *
 * @example
 * // Date picker (default)
 * <DatePicker value={date} onChange={setDate} />
 *
 * // DateTime picker
 * <DatePicker mode="datetime" value={date} onChange={setDate} />
 *
 * // Week picker
 * <DatePicker mode="week" value={date} onChange={setDate} />
 *
 * // Month picker
 * <DatePicker mode="month" value={date} onChange={setDate} />
 *
 * // Custom year range (10 years back, 5 years ahead from current year)
 * <DatePicker yearsBack={10} yearsAhead={5} value={date} onChange={setDate} />
 *
 * // With operator
 * <DatePicker showOperator operator={operator} onOperatorChange={setOperator} value={date} onChange={setDate} />
 */
export const DatePicker = memo<DatePickerProps>(
  ({
    id,
    value,
    onChange,
    mode = 'date',
    placeholder,
    className,
    disabled = false,
    minDate,
    maxDate,
    showClearButton = true,
    yearsBack = 50,
    yearsAhead = 50,
    showOperator,
    operator,
    onOperatorChange,
  }) => {
    const {
      isOpen,
      setIsOpen,
      currentMonth,
      setCurrentMonth,
      selectedHour,
      selectedMinute,
      handleDateSelect,
      handleTimeChange,
      handleClear,
      handleMonthChange,
      handleYearChange,
      handleMonthSelect,
      handleWeekSelect,
      yearOptions,
      monthOptions,
      normalizedValue,
    } = useDatePicker({
      value,
      onChange,
      mode,
      minDate,
      maxDate,
      yearsBack,
      yearsAhead,
    });

    // Memoize display text for performance
    const displayText = useMemo(() => {
      if (!normalizedValue) {
        return placeholder || `Select ${mode === 'datetime' ? 'date & time' : mode}`;
      }
      return formatDateDisplay(normalizedValue, mode);
    }, [normalizedValue, mode, placeholder]);

    // Determine popover width based on mode
    const popoverClassName = useMemo(() => {
      if (mode === 'week') return 'w-[400px] p-0';
      if (mode === 'month') return 'w-[320px] p-0';
      return 'w-auto p-0';
    }, [mode]);

    // Memoize current month and year values separately to reduce re-renders
    const currentMonthValue = useMemo(() => currentMonth.getMonth().toString(), [currentMonth]);
    const currentYearValue = useMemo(() => currentMonth.getFullYear().toString(), [currentMonth]);

    const currentOperator = OPERATOR_OPTIONS.find((op) => op.value === operator);

    // Render header controls (month/year selectors)
    const renderHeaderControls = useMemo(() => {
      if (mode === 'month') return null; // Month mode shows year selector in content

      return (
        <div className="p-3 border-b">
          <div className="flex gap-2">
            <Select value={currentMonthValue} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={currentYearValue} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }, [mode, currentMonthValue, currentYearValue, handleMonthChange, handleYearChange, yearOptions, monthOptions]);

    // Memoize the disabled function for Calendar to prevent recreation
    const calendarDisabled = useMemo(() => {
      if (!minDate && !maxDate) return undefined;

      return (date: Date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
      };
    }, [minDate, maxDate]);

    // Memoize year and month values
    const currentYear = useMemo(() => currentMonth.getFullYear(), [currentMonth]);
    const currentMonthIndex = useMemo(() => currentMonth.getMonth(), [currentMonth]);

    // Render appropriate picker based on mode
    const renderPicker = useMemo(() => {
      switch (mode) {
        case 'week':
          return <WeekPicker selectedDate={normalizedValue} year={currentYear} month={currentMonthIndex} onWeekSelect={handleWeekSelect} />;

        case 'month':
          return (
            <MonthPicker
              selectedDate={normalizedValue}
              year={currentYear}
              onMonthSelect={handleMonthSelect}
              minDate={minDate}
              maxDate={maxDate}
              yearsBack={yearsBack}
              yearsAhead={yearsAhead}
            />
          );

        case 'datetime':
        case 'date':
        default:
          return (
            <div className="flex">
              <Calendar mode="single" selected={normalizedValue} onSelect={handleDateSelect} month={currentMonth} onMonthChange={setCurrentMonth} disabled={calendarDisabled} />
              {mode === 'datetime' && (
                <div className="px-3 pb-3 border-l">
                  <div className="px-3 pb-3 border-l">
                    <TimePicker hour={selectedHour} minute={selectedMinute} onChange={handleTimeChange} disabled={!normalizedValue} />
                  </div>
                </div>
              )}
            </div>
          );
      }
    }, [
      mode,
      normalizedValue,
      currentMonth,
      currentYear,
      currentMonthIndex,
      handleDateSelect,
      handleWeekSelect,
      handleMonthSelect,
      setCurrentMonth,
      selectedHour,
      selectedMinute,
      handleTimeChange,
      calendarDisabled,
      maxDate,
      minDate,
      yearsAhead,
      yearsBack,
    ]);

    const triggerButton = (
      <Button
        variant={showOperator ? 'ghost' : 'outline'}
        className={cn(
          'w-full justify-start text-left font-normal',
          !normalizedValue && 'text-muted-foreground',
          showOperator && 'border-0 shadow-none rounded-none focus-visible:ring-0 h-auto py-2',
          className,
        )}
        disabled={disabled}
        data-slot={showOperator ? 'input-group-control' : undefined}>
        <CalendarIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">{displayText}</span>
      </Button>
    );

    const content = (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className={cn('relative', showOperator ? 'flex-1' : 'w-full')}>
          <PopoverTrigger id={id} asChild>
            {triggerButton}
          </PopoverTrigger>
          {normalizedValue && !disabled && showClearButton && (
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full flex items-center justify-center z-10 hover:bg-muted transition-colors"
              onClick={handleClear}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label="Clear selection">
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
        <PopoverContent className={popoverClassName} align="start">
          {renderHeaderControls}
          {renderPicker}
        </PopoverContent>
      </Popover>
    );

    if (showOperator) {
      return (
        <InputGroup className={cn('w-full', className)}>
          {content}
          <InputGroupAddon align="inline-end" className="p-0 border-l">
            <Select value={operator} onValueChange={onOperatorChange} disabled={disabled}>
              <SelectTrigger className="h-full border-0 rounded-none shadow-none focus:ring-0 px-3 min-w-[100px] bg-transparent">
                <SelectValue>
                  <span className="flex items-center gap-1">
                    <span className="font-mono text-sm">{currentOperator?.symbol}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[80px]">
                      {currentOperator?.value === 'eq'
                        ? 'Equal'
                        : currentOperator?.value === 'gt'
                          ? 'Greater'
                          : currentOperator?.value === 'gte'
                            ? 'Gt/Eq'
                            : currentOperator?.value === 'lt'
                              ? 'Less'
                              : currentOperator?.value === 'lte'
                                ? 'Ls/Eq'
                                : 'Not Eq'}
                    </span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {OPERATOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{option.symbol}</span>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InputGroupAddon>
        </InputGroup>
      );
    }

    return content;
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
