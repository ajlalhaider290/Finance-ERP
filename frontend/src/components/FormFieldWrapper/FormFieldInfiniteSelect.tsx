import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { InfiniteScrollDropdown, type InfiniteScrollOption } from '@/components/InfiniteScrollDropdown';
import { Field, FieldError, FieldLabel, FieldDescription } from '@/components/ui/field';
import { FormFieldBaseProps } from './types';
import { AxiosResponse } from 'axios';

interface FormFieldInfiniteSelectProps<T extends FieldValues> extends FormFieldBaseProps<T> {
  fetchData?: (page: number, limit: number, search?: string) => Promise<AxiosResponse<InfiniteScrollOption[], unknown>>;
  options?: InfiniteScrollOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  clearable?: boolean;
  minSearchLength?: number;
  initialOption?: InfiniteScrollOption;
  debounceDelay?: number;
}

export const FormFieldInfiniteSelect = <T extends FieldValues>({
  name,
  label,
  required,
  description,
  className,
  disabled,
  fetchData,
  options,
  placeholder,
  searchPlaceholder,
  clearable,
  minSearchLength,
  initialOption,
  debounceDelay,
}: FormFieldInfiniteSelectProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <InfiniteScrollDropdown
            fetchData={fetchData}
            options={options}
            value={field.value?.toString() || ''}
            onChange={field.onChange}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            clearable={clearable}
            disabled={disabled}
            minSearchLength={minSearchLength}
            initialOption={initialOption}
            debounceDelay={debounceDelay}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
