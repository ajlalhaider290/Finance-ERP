import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Building2, FileText, ReceiptText, ShieldCheck, WalletCards } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <ReceiptText className="h-8 w-8" />,
      title: 'Reimbursement Control',
      description: 'Submit, review, approve, and track employee reimbursements with supporting documents.',
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Invoice Operations',
      description: 'Manage vendor and customer invoices, payment status, and finance review workflows.',
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Intercompany Tracking',
      description: 'Record transactions between entities and monitor settlement and reconciliation status.',
    },
    {
      icon: <WalletCards className="h-8 w-8" />,
      title: 'Payments and Journals',
      description: 'Track payments, allocations, journal entries, tax codes, and chart-of-account mappings.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'Approvals and Audit',
      description: 'Preserve approval history, role-based access, and audit logs for financial activity.',
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Finance Dashboards',
      description: 'View pending approvals, reimbursement status, invoice aging, and operational KPIs.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Finance Operations ERP</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A centralized internal workspace for reimbursements, invoices, approvals, payments, intercompany transactions, and finance reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Open Finance Workspace
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              View Demo Scope
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Finance Teams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Focused modules for the reimbursement, invoice, intercompany, accounting, and approval workflows shown in the demo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="text-center p-8">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Ready for the Live Demo</CardTitle>
              <CardDescription className="text-lg mb-8">Use the prepared demo account to walk through master data, reimbursements, invoices, approvals, and reporting screens.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="px-8">
                Launch Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
