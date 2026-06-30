import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { IntercompanySettlementRecordTable } from "./component/table";
import INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS from "./constants";
import { IntercompanySettlementRecordCreateAction } from './component/header-actions';

const IntercompanySettlementRecordCreate = lazy(() => import('./component/header-actions/create'));
const IntercompanySettlementRecordUpdate = lazy(() => import('./component/row-actions/update'));
const IntercompanySettlementRecordDelete = lazy(() => import('./component/row-actions/delete'));
const IntercompanySettlementRecordView = lazy(() => import('./component/row-actions/view'));

const IntercompanySettlementRecordPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{INTERCOMPANY_SETTLEMENT_RECORD_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <IntercompanySettlementRecordCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <IntercompanySettlementRecordTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<IntercompanySettlementRecordCreate />
				<IntercompanySettlementRecordUpdate />
				<IntercompanySettlementRecordDelete />
				<IntercompanySettlementRecordView />
        </Suspense>
    </div>
  );
});

IntercompanySettlementRecordPage.displayName = 'IntercompanySettlementRecordPage';
export default IntercompanySettlementRecordPage;