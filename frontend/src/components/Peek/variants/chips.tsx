import { Badge } from '@/components/ui/badge';

export type ChipsProps = {
  title?: string;
  items: string[];
  mode?: 'badges' | 'joined';
  separator?: string;
};

export function ChipsVariant({ title, items, mode = 'badges', separator = ', ' }: ChipsProps) {
  return (
    <div className="flex flex-col gap-2">
      {title && <p className="text-xs font-semibold text-muted-foreground">{title}</p>}
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">None</p>
      ) : mode === 'joined' ? (
        <p className="text-xs">{items.join(separator)}</p>
      ) : (
        <div className="flex flex-wrap gap-1">
          {items.map((item, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
