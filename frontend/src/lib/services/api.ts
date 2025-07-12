import { IDishes } from "@/interfaces/IDishes";
import { IRestaurants } from "@/interfaces/IRestaurants";
import { IUser } from "@/interfaces/IUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eatlyApi = createApi({
  reducerPath: "eatlyApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getRestaurants: builder.query<IRestaurants[], void>({
      query: () => "http://localhost:5000/restaurants",
    }),
    getDishes: builder.query<IDishes[], void>({
      query: () => "http://localhost:5000/dishes",
    }),
  }),
});

export const { useGetRestaurantsQuery, useGetDishesQuery } = eatlyApi;
