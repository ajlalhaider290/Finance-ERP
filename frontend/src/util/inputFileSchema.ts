import { z } from 'zod';

// Size limits
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MIN_FILE_SIZE_BYTES = 1; // > 0 bytes

/// Allowed MIME types
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Allowed extensions (lowercase, without dot)
export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

// Filename constraints
export const MAX_FILENAME_LENGTH = 128;

// Helper: extract extension safely
const getExtension = (name: string) => (name.includes('.') ? name.split('.').pop()!.toLowerCase() : '');

// Helper: simple control-char detection
// eslint-disable-next-line no-control-regex
const hasControlChars = (s: string) => /[\u0000-\u001F\u007F]/.test(s);

type FileCfg = {
  maxBytes?: number;
  minBytes?: number;
  mimes?: string[];
  exts?: string[];
  maxNameLen?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
};

// Helper to get image dimensions
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
};

export const inputFileSchema = (cfg?: FileCfg) => {
  const max = cfg?.maxBytes ?? MAX_FILE_SIZE_BYTES;
  const min = cfg?.minBytes ?? MIN_FILE_SIZE_BYTES;
  const mimes = cfg?.mimes ?? ALLOWED_MIME_TYPES;
  const exts = cfg?.exts ?? ALLOWED_EXTENSIONS;
  const maxName = cfg?.maxNameLen ?? MAX_FILENAME_LENGTH;

  // NOTE: In browsers, File exists on globalThis. If you ever validate on the server,
  // you can swap to z.custom<File>(v => v instanceof File) for safety.
  return (
    z
      .instanceof(File, { message: 'A file is required' })

      // >0 bytes
      .refine((f) => f.size >= min, { message: 'File is empty' })

      // size ceiling
      .refine((f) => f.size <= max, {
        message: `File must be ≤ ${Math.floor(max / (1024 * 1024))}MB`,
      })

      // mime allow-list
      .refine((f) => mimes.includes(f.type), {
        message: `Unsupported file type. Allowed: ${mimes.join(', ')}`,
      })

      // filename + extension checks (v4: use "custom")
      .superRefine((file, ctx) => {
        const name = file.name ?? '';

        if (!name) {
          ctx.addIssue({ code: 'custom', message: 'Filename is required' });
          return;
        }

        if (name.length > maxName) {
          ctx.addIssue({
            code: 'custom',
            message: `Filename too long (>${maxName} chars)`,
          });
        }

        if (hasControlChars(name)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Filename contains invalid control characters',
          });
        }

        const ext = getExtension(name);
        if (!ext) {
          ctx.addIssue({ code: 'custom', message: 'Filename must have an extension' });
        } else if (!exts.includes(ext)) {
          ctx.addIssue({
            code: 'custom',
            message: `Invalid extension ".${ext}". Allowed: ${exts.join(', ')}`,
          });
        }

        // Optional: guard against "invoice.pdf.exe" style double extensions
        const parts = name.toLowerCase().split('.');
        if (parts.length >= 3) {
          const last = parts.pop()!;
          const prev = parts.pop()!;
          const suspicious = ['exe', 'bat', 'cmd', 'com', 'js', 'vbs', 'scr'];
          if (suspicious.includes(last) && !exts.includes(prev)) {
            ctx.addIssue({ code: 'custom', message: 'Suspicious double extension' });
          }
        }
      })

      // Image dimension validation (async)
      .superRefine(async (file, ctx) => {
        // Only check dimensions for image files and if dimension constraints are specified
        if (!file.type.startsWith('image/')) return;
        if (!cfg?.minWidth && !cfg?.maxWidth && !cfg?.minHeight && !cfg?.maxHeight) return;

        try {
          const { width, height } = await getImageDimensions(file);

          if (cfg?.minWidth && width < cfg.minWidth) {
            ctx.addIssue({ code: 'custom', message: `Image width must be at least ${cfg.minWidth}px` });
          }
          if (cfg?.maxWidth && width > cfg.maxWidth) {
            ctx.addIssue({ code: 'custom', message: `Image width must be at most ${cfg.maxWidth}px` });
          }
          if (cfg?.minHeight && height < cfg.minHeight) {
            ctx.addIssue({ code: 'custom', message: `Image height must be at least ${cfg.minHeight}px` });
          }
          if (cfg?.maxHeight && height > cfg.maxHeight) {
            ctx.addIssue({ code: 'custom', message: `Image height must be at most ${cfg.maxHeight}px` });
          }
        } catch {
          ctx.addIssue({ code: 'custom', message: 'Could not read image dimensions' });
        }
      })
  );
};
