import { useQuery } from '@tanstack/react-query';
import { Post } from './types';
import { API_BASE_URL, http } from './http';

// get posts list custom query
const postsListQueryKey = ['posts'];
export const useGetPostsListQuery = () => {
  return useQuery({
    queryKey: postsListQueryKey,
    queryFn: () => http<Post[]>(`${API_BASE_URL}/posts`),
  });
};
