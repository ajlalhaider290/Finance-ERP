import { useQuery } from '@tanstack/react-query';
import { getSelectInvoiceLineItems } from '../service';


export function useInvoiceLineItemOptions() {
  const query = useQuery({
    queryKey: ['invoiceLineItem', 'select'],
    queryFn: async () => {
      const response = await getSelectInvoiceLineItems();
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
