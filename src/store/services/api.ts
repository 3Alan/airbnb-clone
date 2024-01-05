import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/api/' }),
  endpoints: builder => ({
    getListings: builder.query({
      query: () => `/listings`
    }),
    getListing: builder.query({
      query: id => `/listings/${id}`
    })
  })
});

export const { useGetListingsQuery, useGetListingQuery } = api;
