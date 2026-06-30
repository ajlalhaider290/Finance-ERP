import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { JournalEntryTable } from "./component/table";
import JOURNAL_ENTRY_CONSTANTS from "./constants";
import { JournalEntryCreateAction } from './component/header-actions';

const JournalEntryCreate = lazy(() => import('./component/header-actions/create'));
const JournalEntryUpdate = lazy(() => import('./component/row-actions/update'));
const JournalEntryDelete = lazy(() => import('./component/row-actions/delete'));
const JournalEntryView = lazy(() => import('./component/row-actions/view'));

const JournalEntryPage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{JOURNAL_ENTRY_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <JournalEntryCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <JournalEntryTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<JournalEntryCreate />
				<JournalEntryUpdate />
				<JournalEntryDelete />
				<JournalEntryView />
        </Suspense>
    </div>
  );
});

JournalEntryPage.displayName = 'JournalEntryPage';
export default JournalEntryPage;