import { Listing } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

export const fetchListings = async ({ pageParam }: { pageParam: number }) => {
  const res = await request(`/listings?page=${pageParam}&num=5`);
  const data = res.data as {
    listings: Listing[];
    hasNextPage: boolean;
  };

  return {
    id: data.listings[0].id,
    items: data.listings,
    nextPage: data.hasNextPage ? pageParam + 1 : undefined
  };
};

export function useListings() {
  return useInfiniteQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
    placeholderData: {
      pages: [],
      pageParams: [1]
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.nextPage;
    }
  });
}

export function useListing(id: string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const res = await request(`/listing/${id}`);
      return res.data;
    },
    placeholderData: {}
  });
}
