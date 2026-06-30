import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { TaxCodeTable } from "./component/table";
import TAX_CODE_CONSTANTS from "./constants";
import { TaxCodeCreateAction } from './component/header-actions';

const TaxCodeCreate = lazy(() => import('./component/header-actions/create'));
const TaxCodeUpdate = lazy(() => import('./component/row-actions/update'));
const TaxCodeDelete = lazy(() => import('./component/row-actions/delete'));
const TaxCodeView = lazy(() => import('./component/row-actions/view'));

const TaxCodePage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{TAX_CODE_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <TaxCodeCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <TaxCodeTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<TaxCodeCreate />
				<TaxCodeUpdate />
				<TaxCodeDelete />
				<TaxCodeView />
        </Suspense>
    </div>
  );
});

TaxCodePage.displayName = 'TaxCodePage';
export default TaxCodePage;