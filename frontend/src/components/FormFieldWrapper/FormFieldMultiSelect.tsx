import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { MultiSearchDropdown } from '@/components/MultiSearchDropdown';
import { Field, FieldError, FieldLabel, FieldDescription } from '@/components/ui/field';
import { FormFieldBaseProps } from './types';
import { AxiosResponse } from 'axios';

interface MultiSelectOption {
  value: string | number;
  label: string;
  color?: string;
  icon?: string;
}

interface FormFieldMultiSelectProps<T extends FieldValues> extends FormFieldBaseProps<T> {
  fetchData?: (page: number, limit: number, search?: string) => Promise<AxiosResponse<MultiSelectOption[], unknown>>;
  options?: MultiSelectOption[];
  placeholder?: string;
  minSearchLength?: number;
  initialOptions?: MultiSelectOption[];
  showBadges?: boolean;
  debounceDelay?: number;
  clearable?: boolean;
  errorMessage?: string;
}

export const FormFieldMultiSelect = <T extends FieldValues>({
  name,
  label,
  required,
  description,
  className,
  disabled,
  fetchData,
  options,
  placeholder,
  minSearchLength,
  initialOptions,
  showBadges,
  debounceDelay,
  clearable,
  errorMessage,
}: FormFieldMultiSelectProps<T>) => {
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
          <MultiSearchDropdown
            fetchData={fetchData}
            options={options}
            selectedValues={Array.isArray(field.value) ? field.value : field.value ? [field.value] : []}
            onChange={(values) => field.onChange(values)}
            placeholder={placeholder}
            minSearchLength={minSearchLength}
            initialOptions={initialOptions}
            showBadges={showBadges}
            debounceDelay={debounceDelay}
            disabled={disabled}
            clearable={clearable}
            errorMessage={errorMessage}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
