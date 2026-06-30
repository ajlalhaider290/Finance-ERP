import { useQuery } from '@tanstack/react-query';
import { getSelectExpenseCategories } from '../service';


export function useExpenseCategoryOptions() {
  const query = useQuery({
    queryKey: ['expenseCategory', 'select'],
    queryFn: async () => {
      const response = await getSelectExpenseCategories();
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
