import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui';
import { Field, FieldError, FieldLabel, FieldDescription, FieldContent } from '@/components/ui/field';
import { FormFieldBaseProps } from './types';

type FormFieldCheckboxProps<T extends FieldValues> = FormFieldBaseProps<T>;

export const FormFieldCheckbox = <T extends FieldValues>({ name, label, required, description, className, disabled }: FormFieldCheckboxProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation="horizontal" className={className}>
          <Checkbox id={field.name} checked={field.value ?? false} onCheckedChange={field.onChange} disabled={disabled} />
          {description ? (
            <FieldContent>
              <FieldLabel htmlFor={String(name)}>
                {label} {required && <span className="text-destructive">*</span>}
              </FieldLabel>
              <FieldDescription>{description}</FieldDescription>
            </FieldContent>
          ) : (
            <FieldLabel htmlFor={String(name)}>
              {label} {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
