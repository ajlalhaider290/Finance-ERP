import { useQuery } from '@tanstack/react-query';
import { getSelectReimbursementDocuments } from '../service';


export function useReimbursementDocumentOptions() {
  const query = useQuery({
    queryKey: ['reimbursementDocument', 'select'],
    queryFn: async () => {
      const response = await getSelectReimbursementDocuments();
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
