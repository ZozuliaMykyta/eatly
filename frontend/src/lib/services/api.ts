import { IArticles } from "@/interfaces/IArticles";
import { IDishes } from "@/interfaces/IDishes";
import { IRestaurants } from "@/interfaces/IRestaurants";
import { IUser } from "@/interfaces/IUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiBaseUrl } from "@/utils/api";

const API_BASE_URL = getApiBaseUrl();

// Temporary debug log
console.log("🔧 DEBUG: API_BASE_URL =", API_BASE_URL);
console.log(
  "🔧 DEBUG: NEXT_PUBLIC_API_BASE_URL =",
  process.env.NEXT_PUBLIC_API_BASE_URL
);

export const eatlyApi = createApi({
  reducerPath: "eatlyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getRestaurants: builder.query<IRestaurants[], void>({
      query: () => "/restaurants",
    }),
    getDishes: builder.query<IDishes[], void>({
      query: () => "/dishes",
    }),
    getUser: builder.query<IUser[], void>({
      query: () => "/users",
    }),
    getArticles: builder.query<IArticles[], void>({
      query: () => "/articles",
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetDishesQuery,
  useGetUserQuery,
  useGetArticlesQuery,
} = eatlyApi;
