import { useQuery } from '@tanstack/react-query';
import { getSelectIntercompanySettlementRecords } from '../service';


export function useIntercompanySettlementRecordOptions() {
  const query = useQuery({
    queryKey: ['intercompanySettlementRecord', 'select'],
    queryFn: async () => {
      const response = await getSelectIntercompanySettlementRecords();
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
