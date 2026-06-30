import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui';
import { Field, FieldError, FieldLabel, FieldDescription } from '@/components/ui/field';
import { FormFieldBaseProps } from './types';

interface FormFieldTextareaProps<T extends FieldValues> extends FormFieldBaseProps<T> {
  placeholder?: string;
  rows?: number;
  textareaClassName?: string;
}

export const FormFieldTextarea = <T extends FieldValues>({
  name,
  label,
  required,
  description,
  className,
  disabled,
  placeholder,
  rows = 6,
  textareaClassName = 'resize-none font-mono',
}: FormFieldTextareaProps<T>) => {
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
          <Textarea id={field.name} placeholder={placeholder} className={textareaClassName} rows={rows} disabled={disabled} {...field} value={field.value?.toString() || ''} />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
