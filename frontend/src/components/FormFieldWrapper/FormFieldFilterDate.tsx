import { Controller, FieldValues, FieldPath, PathValue, useFormContext } from 'react-hook-form';
import { DatePicker } from '@/components/DatePicker';
import { Field } from '@/components/ui/field';
import { Operator } from '@/types/operator';

interface FormFieldFilterDateProps<T extends FieldValues> {
  name: FieldPath<T>;
  operatorFieldName: FieldPath<T>;
  placeholder?: string;
  className?: string;
}

export const FormFieldFilterDate = <T extends FieldValues>({ name, operatorFieldName, placeholder, className }: FormFieldFilterDateProps<T>) => {
  const { control, watch, setValue } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <DatePicker
            placeholder={placeholder}
            value={field.value || undefined}
            onChange={field.onChange}
            showOperator={true}
            operator={watch(operatorFieldName) || 'eq'}
            onOperatorChange={(val: Operator) => {
              setValue(operatorFieldName, val as PathValue<T, FieldPath<T>>);
            }}
          />
        </Field>
      )}
    />
  );
};
