import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileDown, Loader2 } from 'lucide-react';

type DataTableExportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  helperText?: string;
  fileName: string;
  defaultFileName?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
  onFileNameChange: (fileName: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
};

export const DataTableExportDialog: React.FC<DataTableExportDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  helperText = 'Export uses your current filters from the table.',
  fileName,
  defaultFileName = 'export.csv',
  isSubmitting = false,
  errorMessage,
  successMessage,
  onFileNameChange,
  onSubmit,
  submitLabel = 'Download Export',
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <FileDown className="mt-0.5 size-4" />
              <p>{helperText}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="datatable-export-file-name">File name</Label>
            <Input
              id="datatable-export-file-name"
              value={fileName}
              onChange={(event) => onFileNameChange(event.target.value)}
              disabled={isSubmitting}
              placeholder={defaultFileName}
            />
          </div>

          {successMessage && <div className="rounded-md border border-green-500/40 bg-green-500/10 p-3 text-sm text-green-700">{successMessage}</div>}

          {errorMessage && <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700">{errorMessage}</div>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Close
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isSubmitting ? 'Exporting...' : submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
