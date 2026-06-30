import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { InvoiceLineItemTable } from "./component/table";
import INVOICE_LINE_ITEM_CONSTANTS from "./constants";
import { InvoiceLineItemCreateAction } from './component/header-actions';

const InvoiceLineItemCreate = lazy(() => import('./component/header-actions/create'));
const InvoiceLineItemUpdate = lazy(() => import('./component/row-actions/update'));
const InvoiceLineItemDelete = lazy(() => import('./component/row-actions/delete'));
const InvoiceLineItemView = lazy(() => import('./component/row-actions/view'));

const InvoiceLineItemPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{INVOICE_LINE_ITEM_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <InvoiceLineItemCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <InvoiceLineItemTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<InvoiceLineItemCreate />
				<InvoiceLineItemUpdate />
				<InvoiceLineItemDelete />
				<InvoiceLineItemView />
        </Suspense>
    </div>
  );
});

InvoiceLineItemPage.displayName = 'InvoiceLineItemPage';
export default InvoiceLineItemPage;