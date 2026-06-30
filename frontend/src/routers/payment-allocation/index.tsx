import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { PaymentAllocationTable } from "./component/table";
import PAYMENT_ALLOCATION_CONSTANTS from "./constants";
import { PaymentAllocationCreateAction } from './component/header-actions';

const PaymentAllocationCreate = lazy(() => import('./component/header-actions/create'));
const PaymentAllocationUpdate = lazy(() => import('./component/row-actions/update'));
const PaymentAllocationDelete = lazy(() => import('./component/row-actions/delete'));
const PaymentAllocationView = lazy(() => import('./component/row-actions/view'));

const PaymentAllocationPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{PAYMENT_ALLOCATION_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <PaymentAllocationCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <PaymentAllocationTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<PaymentAllocationCreate />
				<PaymentAllocationUpdate />
				<PaymentAllocationDelete />
				<PaymentAllocationView />
        </Suspense>
    </div>
  );
});

PaymentAllocationPage.displayName = 'PaymentAllocationPage';
export default PaymentAllocationPage;