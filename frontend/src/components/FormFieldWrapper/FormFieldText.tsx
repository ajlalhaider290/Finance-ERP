import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui';
import { Field, FieldError, FieldLabel, FieldDescription } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { FormFieldBaseProps } from './types';

interface FormFieldTextProps<T extends FieldValues> extends FormFieldBaseProps<T> {
  placeholder?: string;
  type?: 'text' | 'integer' | 'decimal' | 'password' | 'email' | 'url' | 'tel';
  step?: string;
}

export const FormFieldText = <T extends FieldValues>({
  name,
  label,
  required,
  description,
  className,
  disabled,
  placeholder,
  type = 'text',
  step,
  icon,
}: FormFieldTextProps<T>) => {
  const { control } = useFormContext<T>();

  const inputType = type === 'integer' || type === 'decimal' ? 'number' : type;
  const inputStep = step ?? (type === 'decimal' ? '0.01' : undefined);

  const handleChange =
    type === 'integer'
      ? (e: React.ChangeEvent<HTMLInputElement>) => (e.target.value === '' ? e.target.value : parseInt(e.target.value) || 0)
      : type === 'decimal'
        ? (e: React.ChangeEvent<HTMLInputElement>) => (e.target.value === '' ? e.target.value : parseFloat(e.target.value) || 0)
        : undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={field.name}>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          {icon ? (
            <InputGroup>
              <InputGroupAddon>{icon}</InputGroupAddon>
              <InputGroupInput
                id={field.name}
                type={inputType}
                step={inputStep}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                value={field.value?.toString() || ''}
                onChange={handleChange ? (e) => field.onChange(handleChange(e)) : field.onChange}
              />
            </InputGroup>
          ) : (
            <Input
              id={field.name}
              type={inputType}
              step={inputStep}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              value={field.value?.toString() || ''}
              onChange={handleChange ? (e) => field.onChange(handleChange(e)) : field.onChange}
            />
          )}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
