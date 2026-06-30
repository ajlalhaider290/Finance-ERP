import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { type LucideIcon } from 'lucide-react';

interface ThemeColors {
  textColor: string;
  bgColor: string;
  borderColor: string;
}

interface ColoredBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  lightColors: ThemeColors;
  darkColors: ThemeColors;
  border?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
}

function ColoredBadge({ lightColors, darkColors, border = true, icon: Icon, className, style, children, ...props }: ColoredBadgeProps) {
  const isDark = useAppSelector((state) => state.session.isDarkTheme);
  const colors = isDark ? darkColors : lightColors;

  const inlineStyle: React.CSSProperties = {
    ...style,
    color: colors.textColor,
    backgroundColor: colors.bgColor,
    borderColor: border ? colors.borderColor : 'transparent',
  };

  return (
    <Badge className={cn(border && 'border', 'flex items-center gap-1.5', className)} style={inlineStyle} {...props}>
      {Icon && <Icon className="size-3.5" />}
      {children}
    </Badge>
  );
}

export { ColoredBadge };
export type { ThemeColors };
