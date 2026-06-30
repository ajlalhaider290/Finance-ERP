import { useQuery } from '@tanstack/react-query';
import { getSelectApprovalHistories } from '../service';


export function useApprovalHistoryOptions() {
  const query = useQuery({
    queryKey: ['approvalHistory', 'select'],
    queryFn: async () => {
      const response = await getSelectApprovalHistories();
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
