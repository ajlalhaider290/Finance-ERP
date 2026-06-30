import React, { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface UseDateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
}

export const useDateRangePicker = ({ value, onChange, placeholder = 'Pick a date range' }: UseDateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => value?.from || new Date());

  const handleDayClick = (day: Date) => {
    if (value?.from && value?.to) {
      // Reset selection to the clicked date
      onChange?.({ from: day, to: undefined });
      // Keep open
      return;
    }
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    // Initial Selection Check:
    // If range has from & to, and they are the same date.
    if (range?.from && range?.to && range.from.getTime() === range.to.getTime()) {
      if (!value?.from || (value.from && value.to)) {
        // Fresh start or Reset -> Treat as start date only
        onChange?.({ from: range.from, to: undefined });
        return;
      }
    }

    // Swapping Logic:
    // If we have a start date but no end date, and the user selects a date BEFORE the start date.
    // React Day Picker might treat this as a new start date (range.to is undefined).
    // We want to treat it as a range selection (swapped).
    if (value?.from && !value?.to && range?.from && !range?.to) {
      if (range.from.getTime() < value.from.getTime()) {
        onChange?.({ from: range.from, to: value.from });
        setIsOpen(false);
        return;
      }
    }

    onChange?.(range);

    // Close popup logic
    if (range?.from && range?.to) {
      // If we are just selecting normally:
      // If previous value was NOT full (so we are completing it now), close.
      if (!value?.to) {
        setIsOpen(false);
      }
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.(undefined);
  };
  const handleMonthChange = (month: string) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(parseInt(month));
    setCurrentMonth(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(parseInt(year));
    setCurrentMonth(newDate);
  };

  const formatDateRange = () => {
    if (!value?.from) return placeholder;
    if (value.from && !value.to) return format(value.from, 'LLL dd, y');
    if (value.from && value.to) {
      return `${format(value.from, 'LLL dd, y')} - ${format(value.to, 'LLL dd, y')}`;
    }
    return placeholder;
  };

  // Generate year options (current year ± 50 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  // Generate month options
  const monthOptions = [
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];

  return {
    isOpen,
    setIsOpen,
    currentMonth,
    setCurrentMonth,
    handleRangeSelect,
    handleDayClick,
    handleClear,
    handleMonthChange,
    handleYearChange,
    formatDateRange,
    yearOptions,
    monthOptions,
  };
};
