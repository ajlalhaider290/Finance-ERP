import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Switch } from '@/components/ui';
import { Field, FieldError, FieldLabel, FieldDescription, FieldContent } from '@/components/ui/field';
import { FormFieldBaseProps } from './types';

type FormFieldSwitchProps<T extends FieldValues> = FormFieldBaseProps<T>;

export const FormFieldSwitch = <T extends FieldValues>({ name, label, required, description, className, disabled }: FormFieldSwitchProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid} className={className}>
          <FieldContent>
            <FieldLabel htmlFor={String(name)}>
              {label} {required && <span className="text-destructive">*</span>}
            </FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>
          <Switch id={field.name} checked={field.value ?? false} onCheckedChange={field.onChange} disabled={disabled} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
