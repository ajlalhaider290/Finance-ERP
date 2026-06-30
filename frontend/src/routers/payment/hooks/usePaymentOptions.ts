import { useQuery } from '@tanstack/react-query';
import { getSelectPayments } from '../service';


export function usePaymentOptions() {
  const query = useQuery({
    queryKey: ['payment', 'select'],
    queryFn: async () => {
      const response = await getSelectPayments();
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
