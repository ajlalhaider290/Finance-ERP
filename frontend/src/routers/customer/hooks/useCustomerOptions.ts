import { useQuery } from '@tanstack/react-query';
import { getSelectCustomers } from '../service';


export function useCustomerOptions() {
  const query = useQuery({
    queryKey: ['customer', 'select'],
    queryFn: async () => {
      const response = await getSelectCustomers();
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
