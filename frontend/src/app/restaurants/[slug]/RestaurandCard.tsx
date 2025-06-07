"use client";
import { useGetRestaurantsQuery } from "@/lib/services/api";
import Image from "next/image";
import React from "react";

const RestaurandCard = ({ slug }: { slug: string }) => {
  const { data, error, isLoading } = useGetRestaurantsQuery();
  const restaurant = data?.find((item) => item._id === slug);

  if (isLoading) {
    return (
      <div className="container text-center custom-border-bx">
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container text-center custom-border-b">
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }
  if (!restaurant) {
    return <div>The restaurant not found</div>;
  }
  return (
    <div className="container">
      <div className="relative w-full max-w-[800px] h-[200px]">
        <Image
          src={restaurant.img}
          alt={restaurant.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default RestaurandCard;
