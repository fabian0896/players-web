import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../context/auth';
import { PlayerService } from '../services';

const useGetPlayer = (id: string | number) => {
  const { token } = useAuth();
  const [customLoading, setCustomLoading] = useState(false);
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
  );

  const deleteMutation = useMutation(
    () => PlayerService.destroy(Number(id), token),
    {
      onSuccess: () => {
        queryClient.removeQueries(['plyers', id], { exact: true });
      }
    }
  );

  const sendCarnet = async () => {
    setCustomLoading(true);
    if (!data) {
      setCustomLoading(false);
      throw new Error('No user found');
    }
    const file = await PlayerService.generateCarnet(data.id, token, false);
    setCustomLoading(false);
    return file;
  }

  return {
    data,
    loading: isLoading,
    error: isError,
    updateActive: updateActiveMutation.mutateAsync,
    destory: deleteMutation.mutateAsync,
    sendCarnet,
    carnetLoading: customLoading,
  }
}

export default useGetPlayer;
