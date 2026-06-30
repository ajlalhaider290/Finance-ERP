import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { memo, Suspense, lazy } from 'react';
import { ReimbursementRequestTable } from "./component/table";
import { ReimbursementRequestCreateAction } from './component/header-actions';

const ReimbursementRequestCreate = lazy(() => import('./component/header-actions/create'));
const ReimbursementRequestUpdate = lazy(() => import('./component/row-actions/update'));
const ReimbursementRequestDelete = lazy(() => import('./component/row-actions/delete'));
const ReimbursementRequestView = lazy(() => import('./component/row-actions/view'));

const ReimbursementRequestPage: React.FC = memo(() => {
  return (
    <div className="space-y-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Finance</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reimbursements</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">Reimbursement Requests</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <ReimbursementRequestCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <ReimbursementRequestTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<ReimbursementRequestCreate />
				<ReimbursementRequestUpdate />
				<ReimbursementRequestDelete />
				<ReimbursementRequestView />
        </Suspense>
    </div>
  );
});

ReimbursementRequestPage.displayName = 'ReimbursementRequestPage';
export default ReimbursementRequestPage;
