import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { CompanyEntityTable } from "./component/table";
import COMPANY_ENTITY_CONSTANTS from "./constants";
import { CompanyEntityCreateAction } from './component/header-actions';

const CompanyEntityCreate = lazy(() => import('./component/header-actions/create'));
const CompanyEntityUpdate = lazy(() => import('./component/row-actions/update'));
const CompanyEntityDelete = lazy(() => import('./component/row-actions/delete'));
const CompanyEntityView = lazy(() => import('./component/row-actions/view'));

const CompanyEntityPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{COMPANY_ENTITY_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <CompanyEntityCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <CompanyEntityTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<CompanyEntityCreate />
				<CompanyEntityUpdate />
				<CompanyEntityDelete />
				<CompanyEntityView />
        </Suspense>
    </div>
  );
});

CompanyEntityPage.displayName = 'CompanyEntityPage';
export default CompanyEntityPage;