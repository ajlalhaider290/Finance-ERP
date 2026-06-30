// src/components/FileUploader.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { BASE_URL } from '@/config/app';
import { cn } from '@/lib/utils';
import { ExternalLink, File, FileArchive, FileAudio, FileImage, FilePlus, FileText, FileVideo, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ZodType } from 'zod';

type ValueMode = 'url' | 'file';

type FileUploaderProps = {
  field: { name: string; value: unknown; onChange: (v: unknown) => void; onBlur?: () => void };
  /** Zod file schema (required or optional). Example: pictureRequiredSchema */
  validateFileSchema?: ZodType<File | null | undefined>;
  /** Called only after schema passes. Return URL/id to store when valueMode='url' */
  onUpload?: (file: File) => Promise<string>;
  onDelete?: (idOrUrl: string) => Promise<void>;
  /** Optional accept; if omitted, use "*". Prefer to derive from your schema cfg when you build it */
  accept?: string;
  sizePx?: number;
  className?: string;
  required?: boolean;
  label?: string;
  /** How to persist into form: 'url' (default) or 'file' */
  valueMode?: ValueMode;
};

const DEFAULT_ACCEPT = '*';
const DEFAULT_SIZE = 128;

const getFileIcon = (mime: string) => {
  if (mime.startsWith('image/')) return <FileImage className="w-10 h-10" />;
  if (mime.startsWith('video/')) return <FileVideo className="w-10 h-10" />;
  if (mime.startsWith('audio/')) return <FileAudio className="w-10 h-10" />;
  if (mime.startsWith('text/')) return <FileText className="w-10 h-10" />;
  if (mime.includes('zip') || mime.includes('rar') || mime.includes('7z')) return <FileArchive className="w-10 h-10" />;
  return <File className="w-10 h-10" />;
};

export default function FileUploader({
  field,
  validateFileSchema,
  onUpload,
  onDelete,
  accept = DEFAULT_ACCEPT,
  sizePx = DEFAULT_SIZE,
  className,
  required = false,
  label,
  valueMode = 'url',
}: FileUploaderProps) {
  const { setValue, trigger, setError, clearErrors, getFieldState, formState } = useFormContext();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>('');
  const [isImageFile, setIsImageFile] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(null);
    setFileType('');
    setIsImageFile(false);
  }, [field.value]);

  const validateFile = async (file?: File | null) => {
    if (!validateFileSchema) return { ok: true as const };
    // If the schema is nullish/optional and user selected nothing:
    const parsed = await (validateFileSchema.safeParseAsync ? validateFileSchema.safeParseAsync(file) : validateFileSchema.safeParse(file));

    if (parsed.success) return { ok: true as const };

    const messages = parsed.error.issues.map((i) => i.message).filter(Boolean);
    const message = messages[0] || 'Invalid file';
    setError(field.name, { type: 'schema', message }, { shouldFocus: true });
    return { ok: false as const, message };
  };

  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      // If schema requires a file, RHF will surface it on submit;
      // else this is fine (no-op).
      return;
    }

    clearErrors(field.name);

    const mime = file.type || 'application/octet-stream';
    setFileType(mime);
    setIsImageFile(mime.startsWith('image/'));

    // Validate via schema BEFORE upload
    const valid = await validateFile(file);
    if (!valid.ok) {
      e.target.value = '';
      return;
    }

    // Preview ASAP
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = (ev.target?.result as string) ?? '';
      setPreviewUrl(dataUrl);

      try {
        if (onUpload && valueMode === 'url') {
          setIsUploading(true);
          const storedIdOrUrl = await onUpload(file);
          setValue(field.name, storedIdOrUrl, { shouldValidate: true, shouldDirty: true });
          await trigger(field.name);
        } else {
          // raw File mode (store file object in form)
          setValue(field.name, file, { shouldValidate: true, shouldDirty: true });
          await trigger(field.name);
        }
      } catch (err) {
        // Revert UI
        setPreviewUrl(null);
        setFileType('');
        setIsImageFile(false);
        setValue(field.name, valueMode === 'url' ? '' : undefined);
        if (inputRef.current) inputRef.current.value = '';
        // Let RHF show error
        const serverMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
        setError(field.name, { type: 'server', message: serverMessage || 'Upload failed' });
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!onDelete) {
      // Local clear only
      setValue(field.name, valueMode === 'url' ? '' : undefined, { shouldValidate: true });
      setPreviewUrl(null);
      setFileType('');
      setIsImageFile(false);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    try {
      setIsDeleting(true);
      const current = String(field.value ?? '');
      if (current) await onDelete(current);
      setValue(field.name, valueMode === 'url' ? '' : undefined, { shouldValidate: true });
      await trigger(field.name);
      setPreviewUrl(null);
      setFileType('');
      setIsImageFile(false);
      if (inputRef.current) inputRef.current.value = '';
    } finally {
      setIsDeleting(false);
    }
  };

  const busy = isUploading || isDeleting;
  const serverUrl = field.value
    ? typeof field.value === 'string'
      ? field.value.startsWith('http')
        ? field.value
        : `${BASE_URL}${field.value.startsWith('/') ? field.value : `/public/${field.value}`}`
      : null
    : null;

  const displayUrl = previewUrl ?? serverUrl;
  const isImage = isImageFile || (displayUrl && displayUrl.startsWith('data:image/')) || (serverUrl && /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(serverUrl || ''));

  const fieldState = getFieldState(field.name, formState);

  return (
    <Field className={cn('', className)} data-invalid={fieldState.invalid}>
      {label && (
        <FieldLabel htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
      )}

      <div className="relative inline-block">
        <div
          className="relative flex flex-col items-center justify-center bg-muted/30 border-2 border-dashed rounded-xl overflow-hidden shadow-sm"
          style={{ width: sizePx, height: sizePx }}>
          {displayUrl && isImage && <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />}

          {displayUrl && !isImage && (
            <div className="flex flex-col gap-2 items-center justify-center p-2 text-muted-foreground">
              {getFileIcon(fileType)}
              <span className="text-foreground text-xs font-medium truncate max-w-[100px]" title={String(field.value ?? '')}>
                {String(field.value ?? '')
                  .split('/')
                  .pop() ?? ''}
              </span>
              <a href={displayUrl} target="_blank" rel="noopener noreferrer" onClick={(ev) => ev.stopPropagation()} className="text-primary hover:text-primary/80 z-10 relative">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {!displayUrl && (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <FilePlus className="w-10 h-10 mb-1" />
              <span className="text-xs">Upload</span>
            </div>
          )}

          {(displayUrl || !!field.value) && (
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-1 right-1 size-5 p-0 rounded-full z-10 cursor-pointer"
              onClick={handleDelete}
              disabled={busy}
              type="button">
              {isDeleting ? <Spinner className="size-3" /> : <X className="size-3" />}
            </Button>
          )}

          <input
            ref={inputRef}
            id={field.name}
            disabled={busy}
            type="file"
            accept={accept}
            onChange={handleFileSelection}
            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
            title=""
          />
        </div>
      </div>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
