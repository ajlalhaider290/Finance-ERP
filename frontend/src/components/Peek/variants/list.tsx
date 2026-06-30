import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getInitials, pick, toStringValue } from '../types';

export type ListHeaderFields<H> = {
  image?: keyof H & string;
  title?: keyof H & string;
  description?: keyof H & string;
};

export type ListItemFields<I> = {
  image?: keyof I & string;
  title?: keyof I & string;
  subtitle?: keyof I & string;
  badge?: keyof I & string;
};

export type ListProps<H, I> = {
  header?: { data: H; fields: ListHeaderFields<H> };
  items: I[];
  itemFields: ListItemFields<I>;
  empty?: string;
};

export function ListVariant<H, I>({ header, items, itemFields, empty = 'No items' }: ListProps<H, I>) {
  const headerImage = header ? toStringValue(pick(header.data, header.fields.image)) : undefined;
  const headerTitle = header ? toStringValue(pick(header.data, header.fields.title)) : undefined;
  const headerDescription = header ? toStringValue(pick(header.data, header.fields.description)) : undefined;
  const hasHeader = Boolean(headerImage || headerTitle || headerDescription);

  return (
    <div className="flex flex-col gap-3">
      {hasHeader && (
        <div className="flex gap-3">
          {(headerImage || headerTitle) && (
            <Avatar className="h-10 w-10">
              {headerImage && <AvatarImage src={headerImage} alt={headerTitle ?? ''} />}
              <AvatarFallback>{getInitials(headerTitle)}</AvatarFallback>
            </Avatar>
          )}
          <div className="space-y-1 min-w-0 flex-1">
            {headerTitle && <p className="text-sm font-semibold truncate">{headerTitle}</p>}
            {headerDescription && <p className="text-xs text-muted-foreground truncate">{headerDescription}</p>}
          </div>
        </div>
      )}

      <div className={hasHeader ? 'flex flex-col gap-2 border-t pt-2' : 'flex flex-col gap-2'}>
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground">{empty}</p>
        ) : (
          items.map((item, idx) => {
            const image = toStringValue(pick(item, itemFields.image));
            const title = toStringValue(pick(item, itemFields.title));
            const subtitle = toStringValue(pick(item, itemFields.subtitle));
            const badge = toStringValue(pick(item, itemFields.badge));
            return (
              <div key={idx} className="flex items-center gap-2">
                {(image || title) && (
                  <Avatar className="h-6 w-6 shrink-0">
                    {image && <AvatarImage src={image} alt={title ?? ''} />}
                    <AvatarFallback className="text-[10px]">{getInitials(title)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="min-w-0 flex-1">
                  {title && <p className="text-xs font-medium truncate">{title}</p>}
                  {subtitle && <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p>}
                </div>
                {badge && (
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {badge}
                  </Badge>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
