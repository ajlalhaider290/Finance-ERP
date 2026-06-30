import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { ApprovalTaskTable } from "./component/table";
import APPROVAL_TASK_CONSTANTS from "./constants";
import { ApprovalTaskCreateAction } from './component/header-actions';

const ApprovalTaskCreate = lazy(() => import('./component/header-actions/create'));
const ApprovalTaskUpdate = lazy(() => import('./component/row-actions/update'));
const ApprovalTaskDelete = lazy(() => import('./component/row-actions/delete'));
const ApprovalTaskView = lazy(() => import('./component/row-actions/view'));

const ApprovalTaskPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{APPROVAL_TASK_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <ApprovalTaskCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <ApprovalTaskTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<ApprovalTaskCreate />
				<ApprovalTaskUpdate />
				<ApprovalTaskDelete />
				<ApprovalTaskView />
        </Suspense>
    </div>
  );
});

ApprovalTaskPage.displayName = 'ApprovalTaskPage';
export default ApprovalTaskPage;