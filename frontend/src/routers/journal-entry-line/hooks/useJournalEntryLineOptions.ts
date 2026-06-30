import { useQuery } from '@tanstack/react-query';
import { getSelectJournalEntryLines } from '../service';


export function useJournalEntryLineOptions() {
  const query = useQuery({
    queryKey: ['journalEntryLine', 'select'],
    queryFn: async () => {
      const response = await getSelectJournalEntryLines();
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
