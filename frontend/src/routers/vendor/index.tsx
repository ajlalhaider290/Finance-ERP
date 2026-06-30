import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { VendorTable } from "./component/table";
import VENDOR_CONSTANTS from "./constants";
import { VendorCreateAction } from './component/header-actions';

const VendorCreate = lazy(() => import('./component/header-actions/create'));
const VendorUpdate = lazy(() => import('./component/row-actions/update'));
const VendorDelete = lazy(() => import('./component/row-actions/delete'));
const VendorView = lazy(() => import('./component/row-actions/view'));

const VendorPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{VENDOR_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <VendorCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <VendorTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<VendorCreate />
				<VendorUpdate />
				<VendorDelete />
				<VendorView />
        </Suspense>
    </div>
  );
});

VendorPage.displayName = 'VendorPage';
export default VendorPage;