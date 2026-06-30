import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { InvoiceDocumentTable } from "./component/table";
import INVOICE_DOCUMENT_CONSTANTS from "./constants";
import { InvoiceDocumentCreateAction } from './component/header-actions';

const InvoiceDocumentCreate = lazy(() => import('./component/header-actions/create'));
const InvoiceDocumentUpdate = lazy(() => import('./component/row-actions/update'));
const InvoiceDocumentDelete = lazy(() => import('./component/row-actions/delete'));
const InvoiceDocumentView = lazy(() => import('./component/row-actions/view'));

const InvoiceDocumentPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{INVOICE_DOCUMENT_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <InvoiceDocumentCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <InvoiceDocumentTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<InvoiceDocumentCreate />
				<InvoiceDocumentUpdate />
				<InvoiceDocumentDelete />
				<InvoiceDocumentView />
        </Suspense>
    </div>
  );
});

InvoiceDocumentPage.displayName = 'InvoiceDocumentPage';
export default InvoiceDocumentPage;