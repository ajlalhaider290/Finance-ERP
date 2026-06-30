import { useQuery } from '@tanstack/react-query';
import { getSelectVendors } from '../service';


export function useVendorOptions() {
  const query = useQuery({
    queryKey: ['vendor', 'select'],
    queryFn: async () => {
      const response = await getSelectVendors();
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
