import { useQuery } from '@tanstack/react-query';

import useAuth from '../hooks/useAuth';

import { useUserStore } from '@/store/user';
import request from '@/utils/request';

export function useReservations() {
  const { user } = useUserStore();
  const { isLogin } = useAuth();

  return useQuery({
    queryKey: ['reservations', user?.id],
    queryFn: async () => {
      const res = await request(`/reservations`);
      return res.data;
    },
    enabled: isLogin
  });
}

export function useReservationConfirmation(params: {
  listingId: string;
  startDate: string;
  endDate: string;
  guestCount: number;
}) {
  return useQuery({
    queryKey: ['reservation-confirmation', params],
    queryFn: async () => {
      const res = await request(`/reservations/confirmation`, {
        params
      });
      return res.data;
    }
  });
}
