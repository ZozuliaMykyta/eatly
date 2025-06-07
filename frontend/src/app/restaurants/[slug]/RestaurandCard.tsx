"use client";
import { useGetRestaurantsQuery } from "@/lib/services/api";
import React from "react";

const RestaurandCard = ({ slug }: { slug: string }) => {
  const { data, error, isLoading } = useGetRestaurantsQuery();
  const restaurant = data?.find((item) => item._id === slug);

  if (!restaurant) {
    return <div>Not found</div>;
  }
  return <div>{restaurant.theme}</div>;
};

export default RestaurandCard;
