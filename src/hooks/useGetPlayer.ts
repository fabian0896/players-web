import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../context/auth';
import { PlayerService } from '../services';

const useGetPlayer = (id: string | number) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery(
    ['players', id], 
    () => {
      return PlayerService.getById(Number(id), token)
    },
    { retry: false }
  );
  
  const updateActiveMutation = useMutation(
    ({ active }: { active: boolean }) => PlayerService.update(Number(id), { active }, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['players', id]);
      }
    }
  )

  const deleteMutation = useMutation(
    () => PlayerService.destroy(Number(id), token),
    {
      onSuccess: () => {
        queryClient.removeQueries(['plyers', id], { exact: true });
      }
    }
  )

  return {
    data,
    loading: isLoading,
    error: isError,
    updateActive: updateActiveMutation.mutateAsync,
    destory: deleteMutation.mutateAsync,
  }
}

export default useGetPlayer;
