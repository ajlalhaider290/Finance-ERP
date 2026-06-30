import { useQuery } from '@tanstack/react-query';
import { getSelectReimbursementRequests } from '../service';


export function useReimbursementRequestOptions() {
  const query = useQuery({
    queryKey: ['reimbursementRequest', 'select'],
    queryFn: async () => {
      const response = await getSelectReimbursementRequests();
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
