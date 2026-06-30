import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { UploadedFile } from '../types/file';

// Local interface matching multer's file structure
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}

// Global file upload restrictions
export const GLOBAL_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const GLOBAL_ALLOWED_MIMES = [
    'image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'
];

export const GLOBAL_ALLOWED_EXTENSIONS = ['jpg', 'png', 'pdf'];


// Configure multer with memory storage and global restrictions
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: GLOBAL_MAX_FILE_SIZE,
    },
    fileFilter: (_req, file, cb) => {
        const ext = file.originalname.split('.').pop()?.toLowerCase();
        if (!GLOBAL_ALLOWED_MIMES.includes(file.mimetype)) {
            return cb(
                new multer.MulterError(
                    'LIMIT_UNEXPECTED_FILE',
                    `File type not allowed. Allowed: ${GLOBAL_ALLOWED_EXTENSIONS.join(', ')}`,
                ),
            );
        }
        if (!ext || !GLOBAL_ALLOWED_EXTENSIONS.includes(ext)) {
            return cb(
                new multer.MulterError(
                    'LIMIT_UNEXPECTED_FILE',
                    `File extension not allowed. Allowed: ${GLOBAL_ALLOWED_EXTENSIONS.join(', ')}`,
                ),
            );
        }
        cb(null, true);
    },
});

// Extend Request type to include validatedFile
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            validatedFile?: UploadedFile;
        }
    }
}

type FileSchemaRegistry = Record<string, z.ZodType<UploadedFile>>;

/**
 * Factory function that creates a file upload middleware
 * @param schemaRegistry - Object mapping field names to their Zod validation schemas
 * @returns Express middleware for handling file uploads
 */
export const createFileUploadMiddleware = (schemaRegistry: FileSchemaRegistry) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // First, use multer to parse the multipart form
        upload.any()(req, res, async (multerError) => {
            if (multerError) {
                res.status(400).json({
                    isError: true,
                    errorCode: 'MULTER_ERROR',
                    message: multerError.message,
                });
                return;
            }

            // Get the uploaded file and use its fieldname as the identifier
            const files = req.files as MulterFile[] | undefined;
            if (!files || files.length === 0) {
                res.status(400).json({
                    isError: true,
                    errorCode: 'MISSING_FILE',
                    message: 'No file uploaded',
                });
                return;
            }

            const uploadedFile = files[0];
            const fieldName = uploadedFile.fieldname;

            // Get the schema for this field
            const schema = schemaRegistry[fieldName];
            if (!schema) {
                res.status(400).json({
                    isError: true,
                    errorCode: 'INVALID_FIELD_NAME',
                    message: `Unknown field name: ${fieldName}. Valid fields: ${Object.keys(schemaRegistry).join(', ')}`,
                });
                return;
            }

            // Convert multer file to UploadedFile format
            const fileData: UploadedFile = {
                fieldname: uploadedFile.fieldname,
                originalname: uploadedFile.originalname,
                encoding: uploadedFile.encoding,
                mimetype: uploadedFile.mimetype,
                size: uploadedFile.size,
                buffer: uploadedFile.buffer,
                isImage: uploadedFile.mimetype.startsWith('image/'),
            };

            // Validate file against schema
            const result = await schema.safeParseAsync(fileData);

            if (!result.success) {
                const errorMessages = result.error.issues.map((e: { message: string }) => e.message).join(', ');
                res.status(400).json({
                    isError: true,
                    errorCode: 'FILE_VALIDATION_ERROR',
                    message: errorMessages,
                });
                return;
            }

            // Attach validated file to request
            req.validatedFile = result.data;
            next();
        });
    };
};
