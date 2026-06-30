import { useQuery } from '@tanstack/react-query';
import { getSelectReimbursementStatusHistories } from '../service';


export function useReimbursementStatusHistoryOptions() {
  const query = useQuery({
    queryKey: ['reimbursementStatusHistory', 'select'],
    queryFn: async () => {
      const response = await getSelectReimbursementStatusHistories();
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
