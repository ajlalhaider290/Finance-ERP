import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj, selectSelectedObjByKey } from '@/store/slice/selectedObjSlice';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import JOURNAL_ENTRY_CONSTANTS from '../../../constants';
import { getJournalEntryDetails } from '../../../service';
import { JournalEntryPrimaryKeys } from '../../../interface';
import { JournalEntryViewDetails } from './view-details';
import { ModalWrapper } from '@/components/Wrapper';

export const JournalEntryView = memo(() => {
  const selectedObj = useAppSelector((state: RootState) => selectSelectedObjByKey(state, JOURNAL_ENTRY_CONSTANTS.ENTITY_KEY));
  const { isOpen, mode, primaryKeys } = selectedObj || {};
  const showView = !!(isOpen && mode === 'view');
  const dispatch = useAppDispatch();

  const { data: journalEntryResponse, isLoading } = useQuery({
    queryKey: [JOURNAL_ENTRY_CONSTANTS.QUERY_KEY, 'detail', primaryKeys?.journalEntryId, primaryKeys],
    queryFn: () => getJournalEntryDetails(primaryKeys as Partial<JournalEntryPrimaryKeys>),
    enabled: Boolean(showView && Object.keys(primaryKeys || {}).length > 0),
  });
  const data = journalEntryResponse?.data;

  const handleClose = useCallback(() => {
    dispatch(resetSelectedObj(JOURNAL_ENTRY_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  return (
    <>
      <ModalWrapper
        title={`${JOURNAL_ENTRY_CONSTANTS.ENTITY_NAME} Details`}
        open={showView}
        onClose={handleClose}
        loading={isLoading}
        width={600}
        
      >
        <JournalEntryViewDetails data={data} />
      </ModalWrapper>
    </>
  );
});

JournalEntryView.displayName = 'JournalEntryView';
export default JournalEntryView;
