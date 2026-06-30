import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import JOURNAL_ENTRY_LINE_CONSTANTS from '../../../constants';
import { getJournalEntryLineDetails } from '../../../service';
import { JournalEntryLinePrimaryKeys } from '../../../interface';
import { JournalEntryLineViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const JournalEntryLineView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: journalEntryLineResponse, isLoading } = useQuery({
    queryKey: [JOURNAL_ENTRY_LINE_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.lineId, primaryKeys],
    queryFn: () => getJournalEntryLineDetails(primaryKeys as Partial<JournalEntryLinePrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = journalEntryLineResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${JOURNAL_ENTRY_LINE_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <JournalEntryLineViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

JournalEntryLineView.displayName = 'JournalEntryLineView';
export default JournalEntryLineView;
