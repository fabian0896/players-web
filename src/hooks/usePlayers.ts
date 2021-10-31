import { useQuery } from 'react-query';
import { useAuth } from '../context/auth';
import { PlayerService } from '../services';


const usePLayers = () => {
  const { token } = useAuth();
  const { data, isError, isLoading } = useQuery('players', async () => {
    const res = await PlayerService.getAll(token);
    console.log(res);
    return res.data;
  });
  return {
    data,
    loading: isLoading,
    error: isError,
  }
}

export default usePLayers;
