import * as React from 'react';
import { PeekShell } from './shell';
import type { PeekWidth } from './types';
import { renderPeekVariant, type PeekStaticVariantProps } from './renderVariant';

type Props<T, H, I> = PeekStaticVariantProps<T, H, I> & {
  width?: PeekWidth;
  children: React.ReactNode;
};

export function PeekStatic<T, H = unknown, I = unknown>(props: Props<T, H, I>) {
  const { width, children, ...variantProps } = props;
  return (
    <PeekShell width={width} content={renderPeekVariant(variantProps as PeekStaticVariantProps<T, H, I>)}>
      {children}
    </PeekShell>
  );
}
