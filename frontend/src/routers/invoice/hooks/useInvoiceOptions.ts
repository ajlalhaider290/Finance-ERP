import { useQuery } from '@tanstack/react-query';
import { getSelectInvoices } from '../service';


export function useInvoiceOptions() {
  const query = useQuery({
    queryKey: ['invoice', 'select'],
    queryFn: async () => {
      const response = await getSelectInvoices();
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
