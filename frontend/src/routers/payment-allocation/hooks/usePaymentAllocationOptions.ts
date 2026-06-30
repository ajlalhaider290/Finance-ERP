import { useQuery } from '@tanstack/react-query';
import { getSelectPaymentAllocations } from '../service';


export function usePaymentAllocationOptions() {
  const query = useQuery({
    queryKey: ['paymentAllocation', 'select'],
    queryFn: async () => {
      const response = await getSelectPaymentAllocations();
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
