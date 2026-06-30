import { Controller, FieldValues, FieldPath, PathValue, useFormContext } from 'react-hook-form';
import { NumberFilter } from '@/components/NumberFilter';
import { Field } from '@/components/ui/field';
import { Operator } from '@/types/operator';

interface FormFieldFilterNumberProps<T extends FieldValues> {
  name: FieldPath<T>;
  operatorFieldName: FieldPath<T>;
  placeholder?: string;
  step?: number;
  className?: string;
}

export const FormFieldFilterNumber = <T extends FieldValues>({ name, operatorFieldName, placeholder, step = 1, className }: FormFieldFilterNumberProps<T>) => {
  const { control, getValues, setValue } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <NumberFilter
            placeholder={placeholder}
            value={{
              operator: (getValues(operatorFieldName) as Operator) || 'eq',
              value: field.value === undefined || field.value === null ? '' : Number(field.value),
            }}
            onChange={(value) => {
              const val = value && value.value !== '' ? value.value : undefined;
              const op = value ? value.operator : 'eq';
              field.onChange(val);
              setValue(operatorFieldName, op as PathValue<T, FieldPath<T>>);
            }}
            step={step}
          />
        </Field>
      )}
    />
  );
};
