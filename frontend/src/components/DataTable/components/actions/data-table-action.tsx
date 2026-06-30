import { Button } from '@/components/ui/button';
import { RootState, useAppSelector } from '@/store';
import { hasAccess } from '@/util/AccessControl';
import { memo, useCallback } from 'react';
import { DataTableActionProps, DataTableActionVariant } from '../../types';
import { cn } from '@/lib/utils';

const variantClasses: Record<string, string> = {
  primary: 'text-primary/90 border-primary/50 hover:bg-primary/5 hover:text-primary hover:border-primary',
  success: 'text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300',
  destructive: 'text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300',
  warning: 'text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300',
  default: '',
};

export const DataTableAction = memo(
  ({ label = '', title, className = '', variant, size = 'icon', colorVariant, icon: Icon, onClick, permission, disabled = false, visible = true }: DataTableActionProps) => {
    const { user } = useAppSelector((state: RootState) => state.session);

    const handleAction = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }
      },
      [onClick],
    );

    if (!visible) return null;

    if (permission && user) {
      if (!hasAccess(user.scope, permission.module, permission.resource, permission.action)) {
        return null;
      }
    }

    const isIconButton = size === 'icon';
    const activeVariant = variant || (isIconButton ? 'outline' : 'default');
    const activeColor = colorVariant || 'default';
    const isOutlineIcon = isIconButton && activeVariant === 'outline';

    return (
      <Button
        variant={activeVariant as DataTableActionVariant}
        size={size}
        title={title || label}
        className={cn('transition-colors', isOutlineIcon && variantClasses[activeColor], className)}
        onClick={handleAction}
        disabled={disabled}>
        {Icon && <Icon className={cn('size-4')} />}
        {!isIconButton && label}
      </Button>
    );
  },
);
