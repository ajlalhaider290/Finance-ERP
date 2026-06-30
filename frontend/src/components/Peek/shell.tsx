import * as React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import type { PeekWidth } from './types';

type ShellProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  width?: PeekWidth;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
};

export function PeekShell({ children, content, width = 'w-72', open, onOpenChange, openDelay = 300, closeDelay = 100 }: ShellProps) {
  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay} open={open} onOpenChange={onOpenChange}>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer">{children}</span>
      </HoverCardTrigger>
      <HoverCardContent className={cn(width)}>{content}</HoverCardContent>
    </HoverCard>
  );
}
