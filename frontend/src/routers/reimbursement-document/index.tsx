import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { ReimbursementDocumentTable } from "./component/table";
import REIMBURSEMENT_DOCUMENT_CONSTANTS from "./constants";
import { ReimbursementDocumentCreateAction } from './component/header-actions';

const ReimbursementDocumentCreate = lazy(() => import('./component/header-actions/create'));
const ReimbursementDocumentUpdate = lazy(() => import('./component/row-actions/update'));
const ReimbursementDocumentDelete = lazy(() => import('./component/row-actions/delete'));
const ReimbursementDocumentView = lazy(() => import('./component/row-actions/view'));

const ReimbursementDocumentPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{REIMBURSEMENT_DOCUMENT_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <ReimbursementDocumentCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <ReimbursementDocumentTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<ReimbursementDocumentCreate />
				<ReimbursementDocumentUpdate />
				<ReimbursementDocumentDelete />
				<ReimbursementDocumentView />
        </Suspense>
    </div>
  );
});

ReimbursementDocumentPage.displayName = 'ReimbursementDocumentPage';
export default ReimbursementDocumentPage;