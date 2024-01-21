import { Listing } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';

import request from '@/utils/request';

export const fetchHomeListings = async ({ pageParam }: { pageParam: number }, params: any) => {
  const res = await request('/listings', {
    params: {
      page: pageParam,
      num: 5,
      ...params,
      category: isEmpty(params.category) || params.category === '全部' ? undefined : params.category
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

export const fetchSearchListings = async ({ pageParam }: { pageParam: number }, params: any) => {
  const res = await request('/listings', {
    params: {
      page: pageParam,
      num: 5,
      ...params
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

export function useHomeListings(params: any) {
  return useInfiniteQuery({
    queryKey: ['home-listings', params],
    queryFn: context => fetchHomeListings(context, params),
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

export function useSearchListings(params: any) {
  return useInfiniteQuery({
    queryKey: ['search-listings', params],
    queryFn: context => fetchSearchListings(context, params),
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
