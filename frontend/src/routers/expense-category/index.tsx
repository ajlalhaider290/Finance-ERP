import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { ExpenseCategoryTable } from "./component/table";
import EXPENSE_CATEGORY_CONSTANTS from "./constants";
import { ExpenseCategoryCreateAction } from './component/header-actions';

const ExpenseCategoryCreate = lazy(() => import('./component/header-actions/create'));
const ExpenseCategoryUpdate = lazy(() => import('./component/row-actions/update'));
const ExpenseCategoryDelete = lazy(() => import('./component/row-actions/delete'));
const ExpenseCategoryView = lazy(() => import('./component/row-actions/view'));

const ExpenseCategoryPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{EXPENSE_CATEGORY_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <ExpenseCategoryCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <ExpenseCategoryTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<ExpenseCategoryCreate />
				<ExpenseCategoryUpdate />
				<ExpenseCategoryDelete />
				<ExpenseCategoryView />
        </Suspense>
    </div>
  );
});

ExpenseCategoryPage.displayName = 'ExpenseCategoryPage';
export default ExpenseCategoryPage;