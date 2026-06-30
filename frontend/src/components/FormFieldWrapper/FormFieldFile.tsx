import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import FileUploader from '@/components/FileUploader';
import { FormFieldBaseProps } from './types';
import { ZodType } from 'zod';

interface FormFieldFileProps<T extends FieldValues> extends Omit<FormFieldBaseProps<T>, 'description'> {
  validateFileSchema?: ZodType<File | null | undefined>;
  onUpload?: (file: File) => Promise<string>;
  onDelete?: (idOrUrl: string) => Promise<void>;
  accept?: string;
  sizePx?: number;
}

export const FormFieldFile = <T extends FieldValues>({ name, label, required, className, validateFileSchema, onUpload, onDelete, accept, sizePx = 128 }: FormFieldFileProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FileUploader
          field={field}
          validateFileSchema={validateFileSchema}
          label={label}
          required={required}
          className={className}
          onUpload={onUpload}
          onDelete={onDelete}
          accept={accept}
          sizePx={sizePx}
        />
      )}
    />
  );
};
