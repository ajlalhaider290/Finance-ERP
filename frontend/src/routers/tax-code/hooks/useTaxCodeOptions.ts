import { useQuery } from '@tanstack/react-query';
import { getSelectTaxCodes } from '../service';


export function useTaxCodeOptions() {
  const query = useQuery({
    queryKey: ['taxCode', 'select'],
    queryFn: async () => {
      const response = await getSelectTaxCodes();
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
