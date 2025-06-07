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
      <div className="relative w-full h-[378px]">
        <Image
          src={restaurant.img}
          alt={restaurant.title}
          fill
          style={{ objectFit: "cover", borderRadius: "30px 30px 0px 0px" }}
        />
      </div>
      <div>
        <h1>{restaurant.title}</h1>
        <div className="flex items-center gap-5">
          <p className="text-[20px] font-manrope leading-[26px] font-normal text-[rgb(142,151,166)]">
            {restaurant.delivery_time}
          </p>
          <div className="flex items-center gap-2.5">
            <Image
              src="/assets/img/purple-star.svg"
              alt="star"
              height={24}
              width={24}
            ></Image>
            <p className="text-[20px] font-manrope leading-[26px] font-normal text-[rgb(142,151,166)] mt-[1px]">
              {restaurant.rating}
            </p>
          </div>
          <div
            className="absolute bottom-[17px] right-[26px] py-[10px] px-[12px] bg-[rgb(219,217,238)] rounded-full shadow-sm hover:shadow-gray-400 transition-all duration-300 active:scale-[1] hover:scale-[1.2] cursor-pointer"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.preventDefault()}
          >
            <div className="relative w-[14px] h-[20px]">
              <Image
                src="/assets/img/Book-mark.svg"
                alt="Book mark"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurandCard;
