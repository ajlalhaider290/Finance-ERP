import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { IntercompanyTransactionTable } from "./component/table";
import INTERCOMPANY_TRANSACTION_CONSTANTS from "./constants";
import { IntercompanyTransactionCreateAction } from './component/header-actions';

const IntercompanyTransactionCreate = lazy(() => import('./component/header-actions/create'));
const IntercompanyTransactionUpdate = lazy(() => import('./component/row-actions/update'));
const IntercompanyTransactionDelete = lazy(() => import('./component/row-actions/delete'));
const IntercompanyTransactionView = lazy(() => import('./component/row-actions/view'));

const IntercompanyTransactionPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{INTERCOMPANY_TRANSACTION_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <IntercompanyTransactionCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <IntercompanyTransactionTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<IntercompanyTransactionCreate />
				<IntercompanyTransactionUpdate />
				<IntercompanyTransactionDelete />
				<IntercompanyTransactionView />
        </Suspense>
    </div>
  );
});

IntercompanyTransactionPage.displayName = 'IntercompanyTransactionPage';
export default IntercompanyTransactionPage;