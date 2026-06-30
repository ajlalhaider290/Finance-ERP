import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { getPaymentsbyMethod } from '../service';
import { DASHBOARD_CONSTANTS } from '../constants';
import { getChartColor } from '@/util/chartColors';

/**
 * Loading skeleton for the chart
 */
const PaymentsbyMethodChartSkeleton = () => {
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

interface PaymentsbyMethodChartProps {
  filters?: Record<string, string | undefined>;
}

/**
 * Payments by Method Chart Component
 */
export const PaymentsbyMethodChart = memo(({ filters }: PaymentsbyMethodChartProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [DASHBOARD_CONSTANTS.QUERY_KEYS.PAYMENTSBY_METHOD, filters],
    queryFn: () => getPaymentsbyMethod(filters),
    refetchOnWindowFocus: false,
  });

  const chartData = (data?.data?.data ?? []).map((item: Record<string, string | number>) => ({
    ...item,
    value: Number(item.value),
  }));

  if (isLoading) {
    return <PaymentsbyMethodChartSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{DASHBOARD_CONSTANTS.LABELS.PAYMENTSBY_METHOD}</CardTitle>
          <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.PAYMENTSBY_METHOD}</CardDescription>
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
          <CardTitle>{DASHBOARD_CONSTANTS.LABELS.PAYMENTSBY_METHOD}</CardTitle>
          <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.PAYMENTSBY_METHOD}</CardDescription>
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
      label: 'Amount',
      color: 'var(--chart-1)',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{DASHBOARD_CONSTANTS.LABELS.PAYMENTSBY_METHOD}</CardTitle>
        <CardDescription>{DASHBOARD_CONSTANTS.DESCRIPTIONS.PAYMENTSBY_METHOD}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="payment_method"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Payment Method', position: 'insideBottom', offset: -5 }}
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
            
            <Bar
              dataKey="value"
              name="Amount"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={getChartColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

PaymentsbyMethodChart.displayName = 'PaymentsbyMethodChart';
