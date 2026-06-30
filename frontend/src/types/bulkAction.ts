import { LucideIcon } from 'lucide-react';

export type BulkActionKey = 'delete' | 'activate' | 'deactivate' | string;
export type BulkActionVariant = 'default' | 'destructive' | 'secondary';

// Confirmation dialog severity levels
export type ConfirmationType = 'default' | 'warning' | 'danger';

export interface BulkActionConfig {
  key: BulkActionKey;
  label: string;
  icon: LucideIcon;
  variant: BulkActionVariant;
  confirmation: {
    type: ConfirmationType; // Visual severity of the confirmation
    title: string;
    description: string;
    confirmLabel: string;
  };
}

// Styling based on confirmation type
export const confirmationStyles = {
  default: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    buttonVariant: 'default' as const,
    warningBg: 'bg-blue-100 dark:bg-blue-900/20',
    warningIcon: 'text-blue-600 dark:text-blue-400',
  },
  warning: {
    iconBg: 'bg-orange-100 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    buttonVariant: 'secondary' as const,
    warningBg: 'bg-orange-100 dark:bg-orange-900/20',
    warningIcon: 'text-orange-600 dark:text-orange-400',
  },
  danger: {
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
    buttonVariant: 'destructive' as const,
    warningBg: 'bg-red-100 dark:bg-red-900/20',
    warningIcon: 'text-red-600 dark:text-red-400',
  },
};
