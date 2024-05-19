import { useQuery, useQueryClient } from '@tanstack/react-query';

import useAuth from '../hooks/useAuth';

import { useUserStore } from '@/store/user';
import request from '@/utils/request';

export function useWishLists() {
  const { user } = useUserStore();
  const { isLogin } = useAuth();

  return useQuery({
    queryKey: ['wishlists', user?.id],
    queryFn: async () => {
      const res = await request(`/wishlists`);
      return res.data;
    },
    enabled: isLogin
  });
}

export function useWishListsRevalidate() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: ['wishlists', user?.id]
    });
}
