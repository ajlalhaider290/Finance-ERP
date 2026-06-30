import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';
import { getTotalInvoices } from '../service';
import { DASHBOARD_CONSTANTS } from '../constants';

/**
 * Loading skeleton for the card
 */
const TotalInvoicesCardSkeleton = () => {
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

interface TotalInvoicesCardProps {
  filters?: Record<string, string | undefined>;
}

/**
 * Total Invoices Card Component
 */
export const TotalInvoicesCard = memo(({ filters }: TotalInvoicesCardProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [DASHBOARD_CONSTANTS.QUERY_KEYS.TOTAL_INVOICES, filters],
    queryFn: () => getTotalInvoices(filters),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <TotalInvoicesCardSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">{DASHBOARD_CONSTANTS.LABELS.TOTAL_INVOICES}</h3>
          <ScrollText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">Failed to load data</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium">{DASHBOARD_CONSTANTS.LABELS.TOTAL_INVOICES}</h3>
        <ScrollText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.data?.count ?? 0}</div>
        <p className="text-xs text-muted-foreground">
          {DASHBOARD_CONSTANTS.DESCRIPTIONS.TOTAL_INVOICES}
        </p>
      </CardContent>
    </Card>
  );
});

TotalInvoicesCard.displayName = 'TotalInvoicesCard';
