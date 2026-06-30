import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getInvoicesTrendbyDate } from '../service';
import { DASHBOARD_CONSTANTS } from '../constants';

/**
 * Loading skeleton for the chart
 */
const InvoicesTrendbyDateChartSkeleton = () => {
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

interface InvoicesTrendbyDateChartProps {
  filters?: Record<string, string | undefined>;
}

/**
 * Invoices Trend by Date Chart Component
 */
export const InvoicesTrendbyDateChart = memo(({ filters }: InvoicesTrendbyDateChartProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [DASHBOARD_CONSTANTS.QUERY_KEYS.INVOICES_TRENDBY_DATE, filters],
    queryFn: () => getInvoicesTrendbyDate(filters),
    refetchOnWindowFocus: false,
  });

  const chartData = data?.data?.data ?? [];

  if (isLoading) {
    return <InvoicesTrendbyDateChartSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{DASHBOARD_CONSTANTS.LABELS.INVOICES_TRENDBY_DATE}</CardTitle>
          <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.INVOICES_TRENDBY_DATE}</CardDescription>
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
          <CardTitle>{DASHBOARD_CONSTANTS.LABELS.INVOICES_TRENDBY_DATE}</CardTitle>
          <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.INVOICES_TRENDBY_DATE}</CardDescription>
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
      label: 'Total Amount',
      color: 'var(--chart-1)',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{DASHBOARD_CONSTANTS.LABELS.INVOICES_TRENDBY_DATE}</CardTitle>
        <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.INVOICES_TRENDBY_DATE}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="invoice_date"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Invoice Date', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                return new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(value);
              }}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            
            <Line
              dataKey="value"
              name="Total Amount"
              stroke="#8884d8"
              type="monotone"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={800}
              connectNulls
            >
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

InvoicesTrendbyDateChart.displayName = 'InvoicesTrendbyDateChart';
