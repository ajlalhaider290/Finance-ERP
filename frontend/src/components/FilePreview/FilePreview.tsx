import React from 'react';
import { Button } from '@/components/ui';
import { X, ExternalLink } from 'lucide-react';
import { FILE_PATH } from '@/config/app';
import { getFileTypeFromUrl, openFileInNewTab } from '@/util/fileTypeUtils';

interface FilePreviewProps {
  value: string | File;
  onRemove: () => void;
  onDelete?: () => void;
  className?: string;
  showFileName?: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({ value, onRemove, onDelete, className = '', showFileName = true }) => {
  if (!value) return null;

  // Handle File object (newly selected)
  if (value instanceof File) {
    const isImage = value.type.startsWith('image/');

    // Get icon based on file type
    const getFileIcon = (type: string, name: string) => {
      if (type.startsWith('image/')) return '🖼️';
      if (type.includes('pdf')) return '📕';
      if (type.includes('excel') || type.includes('spreadsheet') || name.endsWith('.xlsx') || name.endsWith('.xls') || name.endsWith('.csv')) return '📊';
      if (type.includes('word') || type.includes('document') || name.endsWith('.docx') || name.endsWith('.doc')) return '📝';
      if (type.includes('powerpoint') || type.includes('presentation') || name.endsWith('.pptx') || name.endsWith('.ppt')) return '📽️';
      if (type.includes('text') || name.endsWith('.txt')) return '📄';
      if (type.includes('zip') || type.includes('archive') || name.endsWith('.zip') || name.endsWith('.rar')) return '📦';
      return '📄';
    };

    return (
      <div className={`mb-4 ${className}`}>
        <div className="relative inline-block">
          {isImage ? (
            <img src={URL.createObjectURL(value)} alt="Selected file preview" className="w-32 h-32 object-cover rounded-lg border shadow-sm" />
          ) : (
            <div className="w-32 h-32 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-1">{getFileIcon(value.type, value.name)}</div>
              <div className="text-xs text-center px-2 break-all font-medium text-foreground">{value.name.length > 15 ? `${value.name.substring(0, 15)}...` : value.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{(value.size / 1024 / 1024).toFixed(1)} MB</div>
            </div>
          )}

          <Button type="button" variant="destructive" size="sm" className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 shadow-md" onClick={onRemove} title="Remove file">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {showFileName && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {value.name} ({(value.size / 1024 / 1024).toFixed(1)} MB)
          </p>
        )}
      </div>
    );
  }

  // Handle string URL (from database)
  if (typeof value === 'string' && value) {
    const fileUrl = value.startsWith('http') ? value : `${FILE_PATH}${value}`;
    const fileInfo = getFileTypeFromUrl(value);
    const fileName = value.split('/').pop() || 'file';

    return (
      <div className={`mb-4 ${className}`}>
        <div className="relative inline-block">
          {fileInfo.isImage ? (
            <img src={fileUrl} alt="Current file" className="w-32 h-32 object-cover rounded-lg border shadow-sm" />
          ) : (
            <div
              role="button"
              tabIndex={0}
              className="w-32 h-32 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border shadow-sm cursor-pointer hover:shadow-md hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
              onClick={() => openFileInNewTab(fileUrl, fileName)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openFileInNewTab(fileUrl, fileName);
                }
              }}
              title="Click to open file">
              <div className="text-4xl mb-1">{fileInfo.icon}</div>
              <div className="text-xs text-center px-2 break-all font-medium text-foreground">{fileName.length > 15 ? `${fileName.substring(0, 15)}...` : fileName}</div>
              <div className="text-xs text-blue-600 mt-1 flex items-center">
                <ExternalLink className="h-3 w-3 me-1" />
                Open
              </div>
            </div>
          )}

          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 shadow-md"
            onClick={onDelete || onRemove}
            title="Delete file">
            <X className="h-4 w-4" />
          </Button>

          {!fileInfo.isImage && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full p-0 bg-background shadow-md hover:bg-accent hover:text-accent-foreground"
              onClick={() => openFileInNewTab(fileUrl, fileName)}
              title="Open in new tab">
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>

        {showFileName && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              Current: {fileName} • {fileInfo.fileType.toUpperCase()}
            </p>
            {!fileInfo.isImage && (
              <button type="button" className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center mt-1" onClick={() => openFileInNewTab(fileUrl, fileName)}>
                <ExternalLink className="h-3 w-3 me-1" />
                Open in new tab
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default FilePreview;
