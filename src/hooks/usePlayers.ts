import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import { useAuth } from '../context/auth';
import { PlayerService } from '../services';


const usePlayers = (query?: string) => {
  const { token } = useAuth();
  const [queryValue] = useDebounce(query, 500, {
    maxWait: 3000,
  });
  const { 
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['players', queryValue?.toLocaleLowerCase()],
    ({ pageParam, queryKey }) => PlayerService.getAll(token, pageParam, queryKey[1]),
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

export default usePlayers;
