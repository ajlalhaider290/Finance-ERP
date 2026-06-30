import { useQuery } from '@tanstack/react-query';
import { getSelectInvoiceDocuments } from '../service';


export function useInvoiceDocumentOptions() {
  const query = useQuery({
    queryKey: ['invoiceDocument', 'select'],
    queryFn: async () => {
      const response = await getSelectInvoiceDocuments();
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
