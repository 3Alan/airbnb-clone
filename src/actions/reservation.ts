import { useQuery } from '@tanstack/react-query';

import { useUserStore } from '@/store/user';
import request from '@/utils/request';

export function useReservation() {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['reservation', user?.id],
    queryFn: async () => {
      const res = await request(`/reservation`);
      return res.data;
    }
  });
}
