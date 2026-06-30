import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { CustomerTable } from "./component/table";
import CUSTOMER_CONSTANTS from "./constants";
import { CustomerCreateAction } from './component/header-actions';

const CustomerCreate = lazy(() => import('./component/header-actions/create'));
const CustomerUpdate = lazy(() => import('./component/row-actions/update'));
const CustomerDelete = lazy(() => import('./component/row-actions/delete'));
const CustomerView = lazy(() => import('./component/row-actions/view'));

const CustomerPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{CUSTOMER_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <CustomerCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <CustomerTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<CustomerCreate />
				<CustomerUpdate />
				<CustomerDelete />
				<CustomerView />
        </Suspense>
    </div>
  );
});

CustomerPage.displayName = 'CustomerPage';
export default CustomerPage;