import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { ApprovalHistoryTable } from "./component/table";
import APPROVAL_HISTORY_CONSTANTS from "./constants";
import { ApprovalHistoryCreateAction } from './component/header-actions';

const ApprovalHistoryCreate = lazy(() => import('./component/header-actions/create'));
const ApprovalHistoryUpdate = lazy(() => import('./component/row-actions/update'));
const ApprovalHistoryDelete = lazy(() => import('./component/row-actions/delete'));
const ApprovalHistoryView = lazy(() => import('./component/row-actions/view'));

const ApprovalHistoryPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{APPROVAL_HISTORY_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <ApprovalHistoryCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <ApprovalHistoryTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<ApprovalHistoryCreate />
				<ApprovalHistoryUpdate />
				<ApprovalHistoryDelete />
				<ApprovalHistoryView />
        </Suspense>
    </div>
  );
});

ApprovalHistoryPage.displayName = 'ApprovalHistoryPage';
export default ApprovalHistoryPage;