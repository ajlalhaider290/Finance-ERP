import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getInitials, pick, toStringValue } from '../types';

export type RecordFields<T> = {
  image?: keyof T & string;
  title?: keyof T & string;
  badge?: keyof T & string;
  description?: keyof T & string;
  rest?: Array<{ key: keyof T & string; label?: string }>;
};

export type RecordProps<T> = {
  data: T;
  fields: RecordFields<T>;
  showLabels?: boolean;
};

export function RecordVariant<T>({ data, fields, showLabels = false }: RecordProps<T>) {
  const image = toStringValue(pick(data, fields.image));
  const title = toStringValue(pick(data, fields.title));
  const badge = toStringValue(pick(data, fields.badge));
  const description = toStringValue(pick(data, fields.description));
  const initialsSource = title ?? description;

  const hasHeader = Boolean(image || title || badge || description);

  return (
    <div className="flex flex-col gap-3">
      {hasHeader && (
        <div className="flex gap-3">
          {(image || initialsSource) && (
            <Avatar className="h-10 w-10">
              {image && <AvatarImage src={image} alt={title ?? description ?? ''} />}
              <AvatarFallback>{getInitials(initialsSource)}</AvatarFallback>
            </Avatar>
          )}
          <div className="space-y-1 min-w-0 flex-1">
            {title && <p className="text-sm font-semibold truncate">{title}</p>}
            {description && <p className="text-xs text-muted-foreground truncate">{description}</p>}
            {badge && (
              <Badge variant="secondary" className="text-xs capitalize">
                {badge}
              </Badge>
            )}
          </div>
        </div>
      )}

      {fields.rest && fields.rest.length > 0 && (
        <div className="flex flex-col gap-1 border-t pt-2">
          {fields.rest.map(({ key, label }) => {
            const value = toStringValue(pick(data, key));
            if (!value) return null;
            return (
              <div key={String(key)} className="flex gap-2 text-xs">
                {showLabels && <span className="text-muted-foreground min-w-[80px] capitalize">{label ?? String(key)}</span>}
                <span className="truncate">{value}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
