import { useQuery } from '@tanstack/react-query';
import { getSelectIntercompanyTransactions } from '../service';


export function useIntercompanyTransactionOptions() {
  const query = useQuery({
    queryKey: ['intercompanyTransaction', 'select'],
    queryFn: async () => {
      const response = await getSelectIntercompanyTransactions();
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
