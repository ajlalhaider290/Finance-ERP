import * as React from 'react';
import { useQuery, type QueryKey } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { PeekShell } from './shell';
import { renderPeekVariant, type PeekStaticVariantProps } from './renderVariant';
import type { PeekWidth } from './types';
import type { ChipsProps, ListHeaderFields, ListItemFields, ListProps, RecordFields, RecordProps } from './variants';

type DynamicRecord<T> = {
  variant: 'record';
  fetcher: () => Promise<T>;
  fields: RecordFields<T>;
  showLabels?: boolean;
};

type DynamicList<H, I> = {
  variant: 'list';
  fetcher: () => Promise<{ header?: H; items: I[] }>;
  headerFields?: ListHeaderFields<H>;
  itemFields: ListItemFields<I>;
  empty?: string;
};

type DynamicChips = {
  variant: 'chips';
  fetcher: () => Promise<string[]>;
  title?: string;
  mode?: 'badges' | 'joined';
  separator?: string;
};

type PeekDynamicVariantProps<T, H, I> = DynamicRecord<T> | DynamicList<H, I> | DynamicChips;

type Props<T, H, I> = PeekDynamicVariantProps<T, H, I> & {
  queryKey: QueryKey;
  width?: PeekWidth;
  children: React.ReactNode;
  notFound?: string;
};

export function PeekDynamic<T, H = unknown, I = unknown>(props: Props<T, H, I>) {
  const [open, setOpen] = React.useState(false);
  return (
    <PeekShell width={props.width} open={open} onOpenChange={setOpen} content={open ? <PeekDynamicContent {...props} /> : null}>
      {props.children}
    </PeekShell>
  );
}

function PeekDynamicContent<T, H, I>(props: Props<T, H, I>) {
  const { data, isLoading } = useQuery({
    queryKey: props.queryKey,
    queryFn: props.fetcher as () => Promise<unknown>,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-2">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (data === undefined || data === null) {
    return <p className="text-xs text-muted-foreground">{props.notFound ?? 'Not found'}</p>;
  }

  const staticProps = buildStaticProps<T, H, I>(props, data);
  return <>{renderPeekVariant(staticProps)}</>;
}

function buildStaticProps<T, H, I>(props: Props<T, H, I>, data: unknown): PeekStaticVariantProps<T, H, I> {
  switch (props.variant) {
    case 'record':
      return {
        variant: 'record',
        data: data as T,
        fields: props.fields,
        showLabels: props.showLabels,
      } satisfies { variant: 'record' } & RecordProps<T>;
    case 'list': {
      const payload = data as { header?: H; items: I[] };
      const header = payload.header && props.headerFields ? { data: payload.header, fields: props.headerFields } : undefined;
      return {
        variant: 'list',
        header,
        items: payload.items,
        itemFields: props.itemFields,
        empty: props.empty,
      } satisfies { variant: 'list' } & ListProps<H, I>;
    }
    case 'chips':
      return {
        variant: 'chips',
        items: data as string[],
        title: props.title,
        mode: props.mode,
        separator: props.separator,
      } satisfies { variant: 'chips' } & ChipsProps;
  }
}
