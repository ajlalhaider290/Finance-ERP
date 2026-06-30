import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { InvoiceTable } from "./component/table";
import INVOICE_CONSTANTS from "./constants";
import { InvoiceCreateAction } from './component/header-actions';

const InvoiceCreate = lazy(() => import('./component/header-actions/create'));
const InvoiceUpdate = lazy(() => import('./component/row-actions/update'));
const InvoiceDelete = lazy(() => import('./component/row-actions/delete'));
const InvoiceView = lazy(() => import('./component/row-actions/view'));

const InvoicePage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{INVOICE_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <InvoiceCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <InvoiceTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<InvoiceCreate />
				<InvoiceUpdate />
				<InvoiceDelete />
				<InvoiceView />
        </Suspense>
    </div>
  );
});

InvoicePage.displayName = 'InvoicePage';
export default InvoicePage;