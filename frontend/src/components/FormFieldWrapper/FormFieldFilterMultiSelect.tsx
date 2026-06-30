import { Controller, FieldValues, FieldPath, useFormContext } from 'react-hook-form';
import { MultiSearchDropdown } from '@/components/MultiSearchDropdown';
import { Field } from '@/components/ui/field';

interface MultiSelectOption {
  value: string | number;
  label: string;
  color?: string;
  icon?: string;
}

interface FormFieldFilterMultiSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  options?: MultiSelectOption[];
  placeholder?: string;
  className?: string;
  showBadges?: boolean;
}

export const FormFieldFilterMultiSelect = <T extends FieldValues>({ name, options, placeholder, className, showBadges }: FormFieldFilterMultiSelectProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <MultiSearchDropdown
            options={options}
            selectedValues={Array.isArray(field.value) ? field.value : field.value ? [field.value] : []}
            onChange={field.onChange}
            placeholder={placeholder}
            showBadges={showBadges ?? false}
          />
        </Field>
      )}
    />
  );
};
