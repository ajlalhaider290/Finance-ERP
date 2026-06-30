import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { DatePicker } from '@/components/DatePicker';
import { Operator } from '@/types/operator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardFiltersProps {
  filters: Record<string, string | undefined>;
  onFilterChange: (key: string, value: string | undefined) => void;
  onReset: () => void;
}

export const DashboardFilters = memo(({ filters, onFilterChange, onReset }: DashboardFiltersProps) => {



  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 grid-cols-12">
          <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
            <Label className="text-sm font-medium mb-2 block">Expense Date</Label>
            <DatePicker
              placeholder="Select expense date"
              value={filters['reimbursementRequestsExpenseDate'] ? new Date(filters['reimbursementRequestsExpenseDate']) : undefined}
              onChange={(date) => onFilterChange('reimbursementRequestsExpenseDate', date ? date.toISOString() : undefined)}
              showOperator={true}
              operator={(filters['reimbursementRequestsExpenseDateOperator'] as Operator) || 'eq'}
              onOperatorChange={(op: Operator) => onFilterChange('reimbursementRequestsExpenseDateOperator', op)}
              mode="date"
              className="w-full"
            />
          </div>
          <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
            <Label className="text-sm font-medium mb-2 block">Reimbursement Status</Label>
            <Select
              value={filters['reimbursementRequestsStatus'] || ''}
              onValueChange={(value) => onFilterChange('reimbursementRequestsStatus', value || undefined)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select reimbursement status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">draft</SelectItem>
                <SelectItem value="submitted">submitted</SelectItem>
                <SelectItem value="under review">under review</SelectItem>
                <SelectItem value="approved">approved</SelectItem>
                <SelectItem value="rejected">rejected</SelectItem>
                <SelectItem value="returned">returned</SelectItem>
                <SelectItem value="paid">paid</SelectItem>
                <SelectItem value="cancelled">cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
            <Label className="text-sm font-medium mb-2 block">Invoice Date</Label>
            <DatePicker
              placeholder="Select invoice date"
              value={filters['invoicesInvoiceDate'] ? new Date(filters['invoicesInvoiceDate']) : undefined}
              onChange={(date) => onFilterChange('invoicesInvoiceDate', date ? date.toISOString() : undefined)}
              showOperator={true}
              operator={(filters['invoicesInvoiceDateOperator'] as Operator) || 'eq'}
              onOperatorChange={(op: Operator) => onFilterChange('invoicesInvoiceDateOperator', op)}
              mode="date"
              className="w-full"
            />
          </div>
          <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
            <Label className="text-sm font-medium mb-2 block">Payment Status</Label>
            <Select
              value={filters['invoicesPaymentStatus'] || ''}
              onValueChange={(value) => onFilterChange('invoicesPaymentStatus', value || undefined)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid">unpaid</SelectItem>
                <SelectItem value="partially paid">partially paid</SelectItem>
                <SelectItem value="paid">paid</SelectItem>
                <SelectItem value="overdue">overdue</SelectItem>
                <SelectItem value="cancelled">cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

DashboardFilters.displayName = 'DashboardFilters';
