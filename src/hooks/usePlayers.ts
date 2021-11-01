import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useAuth } from '../context/auth';
import { PlayerService } from '../services';


const usePLayers = () => {
  const { token } = useAuth();
  const { 
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'players',
    ({ pageParam }) => PlayerService.getAll(token, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  
  const pages = useMemo(() => {
    return data?.pages.flatMap((d) => d.data);
  }, [data]);

  return {
    pages,
    data,
    loading: isLoading,
    error: isError,
    fetchNextPage,
    hasNextPage
  }
}

export default usePLayers;
