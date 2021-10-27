import { useEffect, useState } from 'react';
import { PLayerResponse } from '../react-app-env';
import { PlayerService } from '../services';

const useGetPlayer = (id: string | number, token: string | null) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [player, setPlayer] = useState<PLayerResponse | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await PlayerService.getById(Number(id), token);
        setPlayer(res);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  return {
    data: player,
    loading,
    error,
  }
}

export default useGetPlayer;
