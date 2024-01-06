import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CategoryItem } from '@/components/common/CategoryTabs';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
  endpoints: builder => ({
    getListings: builder.query({
      query: () => `/listings`
    }),
    getListing: builder.query({
      query: id => `/listings/${id}`
    }),
    getCategories: builder.query<CategoryItem[], void>({
      query: () => `/categories`
    })
  })
});

export const { useGetListingsQuery, useGetListingQuery, useGetCategoriesQuery } = api;
