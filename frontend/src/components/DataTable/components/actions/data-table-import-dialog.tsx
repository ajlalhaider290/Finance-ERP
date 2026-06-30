import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Loader2 } from 'lucide-react';

export type ImportResultSummary = {
  title: string;
  description?: string;
  details?: string[];
};

type DataTableImportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  accept?: string;
  helperText?: string;
  file: File | null;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  resultSummary?: ImportResultSummary | null;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
  submitLabel?: string;
};

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
};

export const DataTableImportDialog: React.FC<DataTableImportDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  accept = '.csv',
  helperText = 'Make sure your file headers match the required import template.',
  file,
  isSubmitting = false,
  errorMessage,
  resultSummary,
  onFileChange,
  onSubmit,
  submitLabel = 'Start Import',
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="datatable-import-file">Select file</Label>
            <Input
              key={file ? 'file-exists' : 'file-empty'}
              id="datatable-import-file"
              type="file"
              accept={accept}
              disabled={isSubmitting}
              onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-muted-foreground">{helperText}</p>
          </div>

          {file && (
            <div className="rounded-md border bg-muted/30 p-3 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <FileText className="size-4" />
                {file.name}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Size: {formatBytes(file.size)}</p>
            </div>
          )}

          {resultSummary && (
            <div className="rounded-md border border-green-500/40 bg-green-500/10 p-3 text-sm">
              <p className="font-medium text-green-700">{resultSummary.title}</p>
              {resultSummary.description && <p className="mt-1 text-green-700/90">{resultSummary.description}</p>}
              {resultSummary.details && resultSummary.details.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-green-800">
                  {resultSummary.details.map((detail, index) => (
                    <li key={`${detail}-${index}`}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {errorMessage && <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700">{errorMessage}</div>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Close
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting || !file}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isSubmitting ? 'Importing...' : submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
