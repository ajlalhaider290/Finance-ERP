import * as React from 'react';
import { ChipsVariant, ListVariant, RecordVariant, type ChipsProps, type ListProps, type RecordProps } from './variants';

export type PeekStaticVariantProps<T, H, I> = ({ variant: 'record' } & RecordProps<T>) | ({ variant: 'list' } & ListProps<H, I>) | ({ variant: 'chips' } & ChipsProps);

export function renderPeekVariant<T, H, I>(props: PeekStaticVariantProps<T, H, I>): React.ReactNode {
  switch (props.variant) {
    case 'record':
      return <RecordVariant {...props} />;
    case 'list':
      return <ListVariant {...props} />;
    case 'chips':
      return <ChipsVariant {...props} />;
  }
}
