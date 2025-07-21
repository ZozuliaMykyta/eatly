"use client";
import { useGetRestaurantsQuery } from "@/lib/services/api";
import Link from "next/link";
import React from "react";
import RestaurantCard from "./restaurants/RestaurantCard";

const Restaurants = () => {
  const { data, error, isLoading } = useGetRestaurantsQuery();

  if (isLoading) {
    return (
      <div className="container text-center custom-border-bx">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          our top <span className="text-purple">restaurants</span>
        </h3>
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container text-center custom-border-b">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          our top <span className="text-purple">restaurants</span>
        </h3>
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }
  return (
    <section>
      <div className="container custom-border-b">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          our top <span className="text-purple">restaurants</span>
        </h3>
        <div className="mt-[50px] md:mt-[86px] grid grid-rows-3 min-[900px]:grid-rows-1 grid-cols-1 min-[900px]:grid-cols-3 justify-between gap-[30px] items-center">
          {data?.slice(0, 3).map((item) => (
            <RestaurantCard item={item} key={item._id} />
          ))}
        </div>
        <div className="text-center min-[900px]:text-right mt-[65px]">
          <Link
            className="font-medium leading-[45px] transition-all duration-300 text-[rgb(172,173,185)] hover:text-black"
            href="#!"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Restaurants;
