import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from './types';
import { API_BASE_URL, http } from './http';

const usersListQueryKey = ['users'];
export const useGetUsersListQuery = () => {
  return useQuery({
    queryKey: usersListQueryKey,
    queryFn: () => http<User[]>(`${API_BASE_URL}/users`),
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: User) => {
      return http<User>(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
      });
    },
    onSuccess: (response) => {
      // add returned user to users list query data in cache
      queryClient.setQueryData(usersListQueryKey, (oldData: User[]) => {
        return oldData ? [...oldData, response] : [response];
      });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: User) => {
      return http<User>(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
      });
    },
    onSuccess: (response) => {
      // update users list query data in cache with response from the server
      queryClient.setQueryData(usersListQueryKey, (oldData: User[]) => {
        const newData = oldData ? [...oldData] : [];
        const responseIndex = newData.findIndex((item) => item.id === response.id);
        if (responseIndex > -1) {
          newData[responseIndex] = response;
        }
        return newData;
      });
    },
  });
};
