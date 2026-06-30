import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui';
import { Field, FieldError, FieldLabel, FieldGroup, FieldSet, FieldLegend } from '@/components/ui/field';
import { FormFieldBaseProps } from './types';

interface FormFieldRadioGroupProps<T extends FieldValues> extends Omit<FormFieldBaseProps<T>, 'label'> {
  legend: string;
  items: string[];
}

export const FormFieldRadioGroup = <T extends FieldValues>({ name, legend, required, className, disabled, items }: FormFieldRadioGroupProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FieldGroup className={className}>
      <FieldSet>
        <FieldLegend variant="label">
          {legend} {required && <span className="text-destructive">*</span>}
        </FieldLegend>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup value={field.value} onValueChange={field.onChange} disabled={disabled}>
                {items.map((item) => (
                  <Field key={item} orientation="horizontal">
                    <RadioGroupItem value={item} id={item} />
                    <FieldLabel htmlFor={item}>{item}</FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </>
          )}
        />
      </FieldSet>
    </FieldGroup>
  );
};
