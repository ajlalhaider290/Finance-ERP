import { memo, useState, useCallback, useMemo } from 'react';
import { TotalReimbursementRequestsCard } from './components/TotalReimbursementRequestsCard';
import { TotalInvoicesCard } from './components/TotalInvoicesCard';
import { TotalInvoiceAmountCard } from './components/TotalInvoiceAmountCard';
import { TotalPaymentsMadeCard } from './components/TotalPaymentsMadeCard';
import { ReimbursementRequestsbyStatusChart } from './components/ReimbursementRequestsbyStatusChart';
import { InvoicesTrendbyDateChart } from './components/InvoicesTrendbyDateChart';
import { PaymentsbyMethodChart } from './components/PaymentsbyMethodChart';
import { DashboardFilters } from './components/DashboardFilters';

/**
 * Dashboard Dashboard Page
 *
 * Displays key metrics and visualizations
 */
const Dashboard = memo(() => {
  const defaultFilters = useMemo<Record<string, string | undefined>>(() => ({}), []);

  const [filters, setFilters] = useState<Record<string, string | undefined>>(defaultFilters);
  const handleFilterChange = useCallback((key: string, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);
  const handleReset = useCallback(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Dashboard dashboard</p>
      </div>

      {/* Filters */}
      <DashboardFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />

      {/* Metrics Cards */}
      <div className="grid gap-4 grid-cols-12">
        <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
          <TotalReimbursementRequestsCard />
        </div>
        <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
          <TotalInvoicesCard />
        </div>
        <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
          <TotalInvoiceAmountCard />
        </div>
        <div className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
          <TotalPaymentsMadeCard />
        </div>
      </div>

      {/* Charts and Tables Section */}
      <div className="grid gap-4 grid-cols-12">
        <div className="lg:col-span-6 col-span-12">
          <ReimbursementRequestsbyStatusChart />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <InvoicesTrendbyDateChart />
        </div>
        <div className="col-span-12">
          <PaymentsbyMethodChart />
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
