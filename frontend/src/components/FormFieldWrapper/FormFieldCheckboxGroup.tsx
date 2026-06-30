import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui';
import { Field, FieldError, FieldLabel, FieldDescription, FieldGroup, FieldSet, FieldLegend } from '@/components/ui/field';
import { FormFieldBaseProps } from './types';

interface FormFieldCheckboxGroupProps<T extends FieldValues> extends Omit<FormFieldBaseProps<T>, 'label'> {
  legend: string;
  legendDescription?: string;
  items: string[];
}

export const FormFieldCheckboxGroup = <T extends FieldValues>({ name, legend, legendDescription, required, className, disabled, items }: FormFieldCheckboxGroupProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FieldGroup className={className}>
      <FieldSet>
        <FieldLegend variant="label">
          {legend} {required && <span className="text-destructive">*</span>}
        </FieldLegend>
        {legendDescription && <FieldDescription>{legendDescription}</FieldDescription>}
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <FieldGroup className="gap-3">
              {items.map((item) => (
                <Field key={item} orientation="horizontal">
                  <Checkbox
                    id={item}
                    checked={field.value?.includes(item)}
                    onCheckedChange={(checked) => (checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter((v: string) => v !== item)))}
                    disabled={disabled}
                  />
                  <FieldLabel htmlFor={item}>{item}</FieldLabel>
                </Field>
              ))}
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </FieldGroup>
          )}
        />
      </FieldSet>
    </FieldGroup>
  );
};
