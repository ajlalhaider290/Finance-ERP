import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OPERATOR_OPTIONS } from '@/enums/operator';
import { cn } from '@/lib/utils';
import { Operator } from '@/types/operator';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface NumberFilterValue {
  operator: Operator;
  value: number | '';
}

interface NumberFilterProps {
  placeholder?: string;
  value?: NumberFilterValue | null;
  onChange?: (filter: NumberFilterValue | null) => void;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  debounceDelay?: number;
}

export const NumberFilter: React.FC<NumberFilterProps> = ({
  placeholder = 'Enter value...',
  value,
  onChange,
  className,
  disabled = false,
  min,
  max,
  step = 1,
  debounceDelay = 300,
}) => {
  const [operator, setOperator] = useState<Operator>(value?.operator || 'eq');
  const [inputValue, setInputValue] = useState<string>(value?.value !== '' ? String(value?.value || '') : '');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value === null || value === undefined) {
      setInputValue('');
      setOperator('eq');
    } else {
      setOperator(value.operator);
      setInputValue(value.value !== '' ? String(value.value) : '');
    }
  }, [value]);

  const handleOperatorChange = useCallback(
    (newOperator: Operator) => {
      setOperator(newOperator);

      if (inputValue !== '') {
        const numValue = parseFloat(inputValue);
        if (!isNaN(numValue)) {
          onChange?.({ operator: newOperator, value: numValue });
        }
      } else {
        onChange?.({ operator: newOperator, value: '' });
      }
    },
    [inputValue, onChange],
  );

  const handleValueChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (newValue === '') {
          onChange?.(null);
        } else {
          const numValue = parseFloat(newValue);
          if (!isNaN(numValue)) {
            onChange?.({ operator, value: numValue });
          }
        }
      }, debounceDelay);
    },
    [operator, onChange, debounceDelay],
  );

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const currentOperator = OPERATOR_OPTIONS.find((op) => op.value === operator);

  return (
    <div className={cn('space-y-2', className)}>
      <InputGroup>
        <InputGroupInput
          type="number"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleValueChange(e.target.value)}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
        />

        <InputGroupAddon align="inline-end" className="p-0 border-l">
          <Select value={operator} onValueChange={handleOperatorChange} disabled={disabled}>
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
    </div>
  );
};

export default NumberFilter;
