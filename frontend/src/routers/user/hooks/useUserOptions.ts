import { useQuery } from '@tanstack/react-query';
import { getSelectUsers } from '../service';


export function useUserOptions(enabled = true) {
  const query = useQuery({
    queryKey: ['user', 'select'],
    queryFn: async () => {
      const response = await getSelectUsers();
      return response.data;
    },
    enabled,
  });

  return {
    data : query.data ?? [],
    isLoading : query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  };
}
