import { IRestaurants } from "@/interfaces/IRestaurants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eatlyApi = createApi({
  reducerPath: "eatlyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getRestaurants: builder.query<IRestaurants[], void>({
      query: () => "restaurants",
    }),
  }),
});

export const { useGetRestaurantsQuery } = eatlyApi;
