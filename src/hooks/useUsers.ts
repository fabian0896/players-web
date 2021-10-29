import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../context/auth';
import { UpdateUserValues } from '../react-app-env';
import { AuthService } from '../services';



type UpdateParams = {
  id: number | string,
  values: UpdateUserValues,
}

const useUsers = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery(
    'users',
    () => AuthService.getUsers(token),
    { retry: false },
  );

  const updateMutation = useMutation(
    ({ id, values }: UpdateParams) => AuthService.updateUser(id, values, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      }
    }
  )

  return {
    data,
    loading: isLoading,
    error: isError,
    update: updateMutation.mutateAsync,
  };
};

export default useUsers;
