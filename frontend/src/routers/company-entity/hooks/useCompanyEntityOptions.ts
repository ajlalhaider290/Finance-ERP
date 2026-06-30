import { useQuery } from '@tanstack/react-query';
import { getSelectCompanyEntities } from '../service';


export function useCompanyEntityOptions() {
  const query = useQuery({
    queryKey: ['companyEntity', 'select'],
    queryFn: async () => {
      const response = await getSelectCompanyEntities();
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
