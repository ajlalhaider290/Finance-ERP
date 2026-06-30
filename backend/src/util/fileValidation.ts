import { z } from 'zod';
import imageSize from 'image-size';
import { FileSchemaOptions, UploadedFile } from '../types/file';

/**
 * Factory function that creates a Zod schema for file validation
 * @param options - Configuration options for file validation
 * @returns A Zod schema that validates file uploads
 */
export const inputFileSchema = (options: FileSchemaOptions): z.ZodType<UploadedFile> => {
    const { maxBytes, mimes, exts, minWidth, maxWidth, minHeight, maxHeight } = options;

    return z
        .custom<UploadedFile>()
        .refine((file) => file && file.buffer && Buffer.isBuffer(file.buffer), {
            message: 'Invalid file: buffer is required',
        })
        .refine((file) => file.size <= maxBytes, {
            message: `File size must not exceed ${Math.round(maxBytes / (1024 * 1024))}MB`,
        })
        .refine((file) => mimes.includes(file.mimetype), {
            message: `Invalid file type. Allowed types: ${mimes.join(', ')}`,
        })
        .refine(
            (file) => {
                const ext = file.originalname.split('.').pop()?.toLowerCase();
                return ext ? exts.includes(ext) : false;
            },
            {
                message: `Invalid file extension. Allowed extensions: ${exts.join(', ')}`,
            }
        )
        .refine(
            (file) => {
                // Only validate dimensions for image files
                if (!mimes.some((m) => m.startsWith('image/'))) {
                    return true;
                }

                // Skip dimension validation if no dimension constraints specified
                if (!minWidth && !maxWidth && !minHeight && !maxHeight) {
                    return true;
                }

                try {
                    const dimensions = imageSize(file.buffer);
                    if (!dimensions.width || !dimensions.height) {
                        return false;
                    }

                    if (minWidth && dimensions.width < minWidth) {
                        return false;
                    }
                    if (maxWidth && dimensions.width > maxWidth) {
                        return false;
                    }
                    if (minHeight && dimensions.height < minHeight) {
                        return false;
                    }
                    if (maxHeight && dimensions.height > maxHeight) {
                        return false;
                    }

                    return true;
                } catch {
                    return false;
                }
            },
            {
                message: `Image dimensions must be between ${minWidth || 0}x${minHeight || 0} and ${maxWidth || '∞'}x${maxHeight || '∞'} pixels`,
            }
        );
};
