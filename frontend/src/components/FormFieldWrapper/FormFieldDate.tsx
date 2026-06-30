import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import DatePicker from '@/components/DatePicker';
import { Field, FieldError, FieldLabel, FieldDescription } from '@/components/ui/field';
import { FormFieldBaseProps } from './types';

interface FormFieldDateProps<T extends FieldValues> extends FormFieldBaseProps<T> {
  placeholder?: string;
  mode?: 'date' | 'datetime' | 'week' | 'month';
  minDate?: Date;
  maxDate?: Date;
}

export const FormFieldDate = <T extends FieldValues>({ name, label, required, description, className, disabled, placeholder, mode, minDate, maxDate }: FormFieldDateProps<T>) => {
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
          <DatePicker value={field.value || undefined} onChange={field.onChange} placeholder={placeholder} disabled={disabled} mode={mode} minDate={minDate} maxDate={maxDate} />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
