import { IArticles } from "@/interfaces/IArticles";
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
    getUser: builder.query<IUser[], void>({
      query: () => "http://localhost:5000/users",
    }),
    getArticles: builder.query<IArticles[], void>({
      query: () => "http://localhost:5000/articles",
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetDishesQuery,
  useGetUserQuery,
  useGetArticlesQuery,
} = eatlyApi;
