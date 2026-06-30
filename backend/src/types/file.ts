export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
    isImage: boolean;
}

export interface FileSchemaOptions {
    maxBytes: number;
    mimes: string[];
    exts: string[];
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}

export interface FileUploadResult {
    url: string;
    originalName: string;
    size: number;
    mimetype: string;
}

export interface FileUploadOptions {
    prefix?: string;
}
