import { useQuery } from '@tanstack/react-query';
import { getSelectCompanyEntities } from '../service';


export function useCompanyEntityOptions(enabled = true) {
  const query = useQuery({
    queryKey: ['companyEntity', 'select'],
    queryFn: async () => {
      const response = await getSelectCompanyEntities();
      return response.data;
    },
    enabled,
  });

  return {
    data : query.data ?? [],
    isLoading : enabled && query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  };
}
