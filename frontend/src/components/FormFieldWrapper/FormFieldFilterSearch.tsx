import { Controller, FieldValues, FieldPath, useFormContext } from 'react-hook-form';
import SearchInput from '@/components/Search';
import { Field } from '@/components/ui/field';

interface FormFieldFilterSearchProps<T extends FieldValues> {
  name: FieldPath<T>;
  placeholder?: string;
  onSearch: () => void;
  autoSearch?: boolean;
  className?: string;
}

export const FormFieldFilterSearch = <T extends FieldValues>({ name, placeholder, onSearch, autoSearch, className }: FormFieldFilterSearchProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <SearchInput placeholder={placeholder} value={field.value?.toString() || ''} onChange={field.onChange} onSearch={onSearch} autoSearch={autoSearch} />
        </Field>
      )}
    />
  );
};
