import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await request(`/users/${id}`);
      return res.data;
    },
    placeholderData: {}
  });
}
