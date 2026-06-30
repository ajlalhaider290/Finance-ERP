import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { getReimbursementRequestsbyStatus } from '../service';
import { DASHBOARD_CONSTANTS } from '../constants';
import { getChartColor } from '@/util/chartColors';

/**
 * Loading skeleton for the chart
 */
const ReimbursementRequestsbyStatusChartSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 bg-muted rounded w-48 mb-2 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-64 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full bg-muted/50 rounded animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground">Loading chart...</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ReimbursementRequestsbyStatusChartProps {
  filters?: Record<string, string | undefined>;
}

/**
 * Reimbursement Requests by Status Chart Component
 */
export const ReimbursementRequestsbyStatusChart = memo(({ filters }: ReimbursementRequestsbyStatusChartProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [DASHBOARD_CONSTANTS.QUERY_KEYS.REIMBURSEMENT_REQUESTSBY_STATUS, filters],
    queryFn: () => getReimbursementRequestsbyStatus(filters),
    refetchOnWindowFocus: false,
  });

  const chartData = (data?.data?.data ?? []).map((item: Record<string, string | number>) => ({
    ...item,
    value: Number(item.value),
  }));

  if (isLoading) {
    return <ReimbursementRequestsbyStatusChartSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{DASHBOARD_CONSTANTS.LABELS.REIMBURSEMENT_REQUESTSBY_STATUS}</CardTitle>
          <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.REIMBURSEMENT_REQUESTSBY_STATUS}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-sm text-destructive">Failed to load chart data</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{DASHBOARD_CONSTANTS.LABELS.REIMBURSEMENT_REQUESTSBY_STATUS}</CardTitle>
          <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.REIMBURSEMENT_REQUESTSBY_STATUS}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-sm text-muted-foreground">No data available</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartConfig = {
    value: {
      label: 'Count',
      color: 'var(--chart-1)',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{DASHBOARD_CONSTANTS.LABELS.REIMBURSEMENT_REQUESTSBY_STATUS}</CardTitle>
        <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.REIMBURSEMENT_REQUESTSBY_STATUS}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              animationDuration={800}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={getChartColor(index)} />
              ))}
            </Pie>
            
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

ReimbursementRequestsbyStatusChart.displayName = 'ReimbursementRequestsbyStatusChart';
