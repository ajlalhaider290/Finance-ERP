import { useQuery } from '@tanstack/react-query';
import { getSelectApprovalTasks } from '../service';


export function useApprovalTaskOptions() {
  const query = useQuery({
    queryKey: ['approvalTask', 'select'],
    queryFn: async () => {
      const response = await getSelectApprovalTasks();
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
