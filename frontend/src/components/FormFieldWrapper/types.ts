import { FieldValues, FieldPath } from 'react-hook-form';
import { ReactNode } from 'react';

export interface FormFieldBaseProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  description?: string;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SelectOption {
  value: string | number;
  label: string;
  color?: string;
  icon?: string;
}
