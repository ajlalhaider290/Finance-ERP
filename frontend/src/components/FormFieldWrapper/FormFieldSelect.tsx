import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Field, FieldError, FieldLabel, FieldDescription } from '@/components/ui/field';
import { FormFieldBaseProps, SelectOption } from './types';
import { icons } from 'lucide-react';

interface FormFieldSelectProps<T extends FieldValues> extends FormFieldBaseProps<T> {
  placeholder?: string;
  options?: SelectOption[];
  valueType?: 'string' | 'boolean';
  loading?: boolean;
}

export const FormFieldSelect = <T extends FieldValues>({
  name,
  label,
  required,
  description,
  className,
  disabled,
  placeholder,
  options = [],
  valueType = 'string',
  loading,
}: FormFieldSelectProps<T>) => {
  const { control } = useFormContext<T>();
  const isDisabled = disabled || loading;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Select
            key={`${String(name)}-${field.value}`}
            onValueChange={(value) => field.onChange(valueType === 'boolean' ? value === 'true' : value)}
            value={field.value?.toString() || ''}
            disabled={isDisabled}>
            <SelectTrigger id={field.name} className="w-full" disabled={isDisabled}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
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
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
