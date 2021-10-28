import { useQuery } from 'react-query';
import { useAuth } from '../context/auth';
import { PlayerService } from '../services';


const usePLayers = () => {
  const { token } = useAuth();
  const { data, isError, isLoading } = useQuery('players', () => PlayerService.getAll(token));
  return {
    data,
    loading: isLoading,
    error: isError,
  }
}

export default usePLayers;
