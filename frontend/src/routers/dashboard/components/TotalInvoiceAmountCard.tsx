import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Landmark } from 'lucide-react';
import { getTotalInvoiceAmount } from '../service';
import { DASHBOARD_CONSTANTS } from '../constants';

/**
 * Loading skeleton for the card
 */
const TotalInvoiceAmountCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 bg-muted rounded w-32"></div>
        <div className="h-4 w-4 bg-muted rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-muted rounded w-16 mb-2"></div>
        <div className="h-3 bg-muted rounded w-40"></div>
      </CardContent>
    </Card>
  );
};

interface TotalInvoiceAmountCardProps {
  filters?: Record<string, string | undefined>;
}

/**
 * Total Invoice Amount Card Component
 */
export const TotalInvoiceAmountCard = memo(({ filters }: TotalInvoiceAmountCardProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [DASHBOARD_CONSTANTS.QUERY_KEYS.TOTAL_INVOICE_AMOUNT, filters],
    queryFn: () => getTotalInvoiceAmount(filters),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <TotalInvoiceAmountCardSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">{DASHBOARD_CONSTANTS.LABELS.TOTAL_INVOICE_AMOUNT}</h3>
          <Landmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">Failed to load data</div>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium">{DASHBOARD_CONSTANTS.LABELS.TOTAL_INVOICE_AMOUNT}</h3>
        <Landmark className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(data?.data?.total ?? 0)}</div>
        <p className="text-xs text-muted-foreground">
          {DASHBOARD_CONSTANTS.DESCRIPTIONS.TOTAL_INVOICE_AMOUNT}
        </p>
      </CardContent>
    </Card>
  );
});

TotalInvoiceAmountCard.displayName = 'TotalInvoiceAmountCard';
