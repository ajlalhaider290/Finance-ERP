import { LucideIcon } from 'lucide-react';
import { ConfirmationType, confirmationStyles } from './bulkAction';

export type RowActionKey = 'activate' | 'deactivate' | string;
export type RowActionVariant = 'default' | 'destructive' | 'secondary';

export interface RowActionConfig<T> {
  key: RowActionKey;
  label: string;
  icon: LucideIcon;
  variant: RowActionVariant;
  isVisible?: (record: T) => boolean;
  permission?: {
    scope: string;
    module: string;
    resource: string;
    action: string;
  };
  confirmation: {
    type: ConfirmationType;
    title: string | ((record: T) => string);
    description: string | ((record: T) => string);
    confirmLabel: string;
  };
}

export interface RowActionState<T> {
  activeAction: RowActionKey | null;
  selectedRecord: T | null;
}

// Re-export for convenience
export { confirmationStyles };
export type { ConfirmationType };
