import { promises as fs } from 'fs';
import * as path from 'path';
import { URL } from 'url';
import logger from '../logger';

// Define the directory path where files will be stored
const dirPath = __dirname + '/../public/';

/**
 * Checks if a file exists in the specified directory
 * @param fileName - The name of the file to check
 * @returns A promise that resolves to true if the file exists, otherwise false
 */
export const fileExists = async (fileName: string): Promise<boolean> => {
    try {
        // Check if the file can be accessed
        await fs.access(dirPath + fileName);
        return true;
    } catch {
        return false;
    }
};

/**
 * Uploads a file buffer to the specified directory
 * @param buffer - The file buffer to be uploaded
 * @param fileName - The name of the file to be saved
 * @returns A promise that resolves to true if the upload is successful
 */
export const uploadFile = async (buffer: Buffer, fileName: string): Promise<boolean> => {
    const fullPath = path.join(dirPath, fileName);
    await fs.writeFile(fullPath, buffer);
    return true;
};

/**
 * Uploads a file to the specified directory (backwards-compatible alias)
 * @param file - Object containing buffer property
 * @param fileName - The name of the file to be saved
 * @returns A promise that resolves to true if the upload is successful
 * @deprecated Use uploadFile instead
 */
export const uploader = (file: { buffer: Buffer }, fileName: string): Promise<boolean> => {
    return uploadFile(file.buffer, fileName);
};

/**
 * Sanitizes a filename by removing special characters and adding a prefix with timestamp
 * @param originalName - The original filename
 * @param prefix - Prefix to add (e.g., 'img', 'file')
 * @returns Sanitized filename
 */
export const sanitizeFileName = (originalName: string, prefix: string | undefined = undefined): string => {
    // Remove all special characters and spaces, replace with underscore
    const cleaned = originalName.replace(/[^a-zA-Z0-9.]/g, '_');
    if (!prefix) {
        return cleaned;
    }
    return `${prefix}_${Date.now()}_${cleaned}`;
};

/**
 * Removes a file from the specified directory
 * @param fileName - The name or URL of the file to be removed
 * @returns A promise that resolves when the file is removed
 */
export const removeFile = async (fileName: string): Promise<void> => {
    try {
        let baseName;
        // Check if the fileName is a URL
        if (fileName.startsWith('http')) {
            // Parse the URL to get the pathname
            const url = new URL(fileName);
            const pathname = url.pathname;
            baseName = path.basename(pathname);
        } else {
            // Use the fileName directly if it's not a URL
            baseName = fileName;
        }

        // Remove the file from the directory
        await fs.unlink(dirPath + baseName);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        // Log an error message if the file removal fails
        logger.error(`Failed to remove the file at path: ${dirPath + fileName}. Error: ${errorMessage}`);
    }
};
