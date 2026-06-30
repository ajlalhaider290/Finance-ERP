// src/components/FilePreview.tsx
'use client';

import { BASE_URL } from '@/config/app';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

type FilePreviewProps = {
  value?: string | null;
  size?: number;
  className?: string;
};

const DEFAULT_SIZE = 128;

/**
 * Detects if a URL is an image by extension or data URL prefix
 */
const isImageUrl = (url: string): boolean => {
  if (url.startsWith('data:image/')) return true;
  return /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(url);
};

/**
 * Resolve full URL (handles relative paths)
 */
const resolveUrl = (value: string): string => {
  if (!value) return '';
  if (value.startsWith('http') || value.startsWith('data:')) return value;
  return `${BASE_URL}${value.startsWith('/') ? value : `/public/${value}`}`;
};

export default function FileView({ value, size = DEFAULT_SIZE, className }: FilePreviewProps) {
  const url = value ? resolveUrl(value) : null;
  const isImage = url ? isImageUrl(url) : false;
  const fileName = value?.split('/').pop() || 'Unknown file';

  return (
    <div className={cn('', className)}>
      {url &&
        (isImage ? (
          <div className="relative flex flex-col items-center justify-center bg-muted/30 border rounded-xl overflow-hidden shadow-sm" style={{ width: size, height: size }}>
            <img src={url} alt={fileName} className="w-full h-full object-cover" />
          </div>
        ) : (
          <a href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-primary hover:text-primary/80">
            <ExternalLink className="w-4 h-4" />
          </a>
        ))}
    </div>
  );
}
