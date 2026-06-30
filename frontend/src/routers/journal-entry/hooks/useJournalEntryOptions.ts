import { useQuery } from '@tanstack/react-query';
import { getSelectJournalEntries } from '../service';


export function useJournalEntryOptions() {
  const query = useQuery({
    queryKey: ['journalEntry', 'select'],
    queryFn: async () => {
      const response = await getSelectJournalEntries();
      return response.data;
    }, 
  });

  return {
    data : query.data ?? [],
    isLoading : query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  };
}
