import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo, Suspense, lazy } from 'react';
import { JournalEntryLineTable } from "./component/table";
import JOURNAL_ENTRY_LINE_CONSTANTS from "./constants";
import { JournalEntryLineCreateAction } from './component/header-actions';

const JournalEntryLineCreate = lazy(() => import('./component/header-actions/create'));
const JournalEntryLineUpdate = lazy(() => import('./component/row-actions/update'));
const JournalEntryLineDelete = lazy(() => import('./component/row-actions/delete'));
const JournalEntryLineView = lazy(() => import('./component/row-actions/view'));

const JournalEntryLinePage: React.FC = memo(() => {
  return (
    <div className="">
      <Card className='border-0 shadow-none md:border md:shadow '>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-0 md:px-6">
          <CardTitle className="text-xl">{JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <JournalEntryLineCreateAction />
          </div>
        </CardHeader>
        <CardContent className='px-0 md:px-6'>
        <JournalEntryLineTable />
        </CardContent>
      </Card>
        <Suspense fallback={null}>
				<JournalEntryLineCreate />
				<JournalEntryLineUpdate />
				<JournalEntryLineDelete />
				<JournalEntryLineView />
        </Suspense>
    </div>
  );
});

JournalEntryLinePage.displayName = 'JournalEntryLinePage';
export default JournalEntryLinePage;