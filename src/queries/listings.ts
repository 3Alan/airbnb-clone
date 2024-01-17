import { Listing } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';

import request from '@/utils/request';

export const fetchListings = async ({ pageParam }: { pageParam: number }, category: string) => {
  const res = await request('/listings', {
    params: {
      page: pageParam,
      num: 5,
      category: isEmpty(category) || category === '全部' ? undefined : category
    }
  });
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

export function useListings(category: string) {
  return useInfiniteQuery({
    queryKey: ['listings', category],
    queryFn: context => fetchListings(context, category),
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
      const res = await request(`/listings/${id}`);
      return res.data;
    }
  });
}
