import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { PaymentTable } from "./component/table";
import PAYMENT_CONSTANTS from "./constants";
import { PaymentCreateAction } from './component/header-actions';

const PaymentCreate = lazy(() => import('./component/header-actions/create'));
const PaymentUpdate = lazy(() => import('./component/row-actions/update'));
const PaymentDelete = lazy(() => import('./component/row-actions/delete'));
const PaymentView = lazy(() => import('./component/row-actions/view'));

const PaymentPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{PAYMENT_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <PaymentCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <PaymentTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<PaymentCreate />
				<PaymentUpdate />
				<PaymentDelete />
				<PaymentView />
        </Suspense>
    </div>
  );
});

PaymentPage.displayName = 'PaymentPage';
export default PaymentPage;