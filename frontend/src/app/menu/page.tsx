"use client";
import RestaurantCard from "@/components/restaurants/RestaurantCard";
import { useGetRestaurantsQuery } from "@/lib/services/api";
import React from "react";

const page = () => {
  const { data, error, isLoading } = useGetRestaurantsQuery();
  if (isLoading) {
    return (
      <div className="container text-center custom-border-b !mt-9">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          our <span className="text-purple">restaurants</span>
        </h3>
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container text-center custom-border-b !mt-9">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          our <span className="text-purple">restaurants</span>
        </h3>
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="mt-[50px] md:mt-[86px] grid grid-rows-3 min-[900px]:grid-rows-1 grid-cols-1 min-[900px]:grid-cols-3 justify-between gap-[30px] items-center">
        {data?.map((restaurant) => (
          <RestaurantCard key={restaurant._id} item={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default page;
