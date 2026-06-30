import { Controller, FieldValues, FieldPath, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Field } from '@/components/ui/field';
import { SelectOption } from './types';
import { icons } from 'lucide-react';

interface FormFieldFilterSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  placeholder?: string;
  options?: SelectOption[];
  allLabel?: string;
  valueType?: 'string' | 'boolean';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onValueChange?: () => void;
}

export const FormFieldFilterSelect = <T extends FieldValues>({
  name,
  placeholder,
  options = [],
  allLabel,
  valueType = 'string',
  loading,
  disabled,
  className,
  onValueChange,
}: FormFieldFilterSelectProps<T>) => {
  const { control } = useFormContext<T>();
  const isDisabled = disabled || loading;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const displayValue = valueType === 'boolean' ? (field.value === true ? 'true' : field.value === false ? 'false' : '') : field.value?.toString() || '';

        return (
          <Field data-invalid={fieldState.invalid} className={className}>
            <Select
              value={displayValue}
              onValueChange={(val) => {
                if (valueType === 'boolean') {
                  const boolVal = val === 'true' ? true : val === 'false' ? false : null;
                  field.onChange(boolVal);
                } else {
                  field.onChange(val);
                }
                onValueChange?.();
              }}
              disabled={isDisabled}>
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {allLabel && <SelectItem value="__all__">{allLabel}</SelectItem>}
                {options?.map((option) => {
                  const Icon = option.icon ? icons[option.icon as keyof typeof icons] : undefined;
                  return (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {Icon && <Icon className="size-3.5 shrink-0" style={option.color ? { color: option.color } : undefined} />}
                      {!Icon && option.color && <span className="size-2 rounded-full shrink-0 inline-block" style={{ backgroundColor: option.color }} />}
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Field>
        );
      }}
    />
  );
};
