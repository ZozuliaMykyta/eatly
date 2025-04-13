"use client";
import { useGetRestaurantsQuery } from "@/lib/services/api";
import Image from "next/image";
import React from "react";

const Restaurants = () => {
  const { data, error, isLoading } = useGetRestaurantsQuery();

  const getThemeBg = (theme: string) => {
    switch (theme.toLowerCase()) {
      case "trending":
        return "rgb(247,197,186)";
      case "supreme":
        return "rgb(51,172,100)";
      default:
        return "rgb(247,237,208)";
    }
  };
  return (
    <section>
      <div className="container custom-border-b">
        <h3 className="capitalize text-center text-[45px] leading-[25px]">
          our top <span className="text-purple">restaurants</span>
        </h3>
        <div className="mt-[86px] flex justify-between gap-[30px] items-center">
          {data?.slice(0, 3).map((item) => (
            <div
              key={item._id}
              style={{
                boxShadow:
                  "5.95px 71.35px 35.67px 0px rgba(229, 229, 229, 0.7)",
              }}
              className="relative rounded-[30px] bg-white border-[1.25px] border-[rgb(244,244,246)] shadow-(5.95px 71.35px 35.67px 0px rgba(229, 229, 229, 0.7))"
            >
              <div className="w-[396px] h-[176px] overflow-hidden rounded-t-[30px]">
                <Image
                  className="object-cover w-full h-full"
                  src={item.img}
                  alt={item.title}
                  width={396}
                  height={176}
                />
              </div>
              <div className="px-[34px] pt-[11px] pb-[18px]">
                <span
                  className="font-normal leading-[19px] text-[12px] px-2 py-0.5 rounded-[5px]"
                  style={{ backgroundColor: getThemeBg(item.theme) }}
                >
                  {item.theme}
                </span>
                <h5 className="text-[26px] leading-[42px] mt-1 text-[rgb(50,49,66)]">
                  {item.title}
                </h5>
                <div className="flex items-center gap-5">
                  <p className="text-[20px] leading-[26px] font-normal text-[rgb(142,151,166)]">
                    {item.delivery_time}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/assets/img/purple-star.svg"
                      alt="star"
                      height={24}
                      width={24}
                    ></Image>
                    <p className="text-[20px] leading-[26px] font-normal text-[rgb(142,151,166)] mt-[1px]">
                      {item.rating}
                    </p>
                  </div>
                </div>
              </div>
              <Image
                className="absolute bottom-[27px] right-[40px]"
                src="/assets/img/Book-mark.svg"
                alt="Book mark"
                width={14}
                height={20}
              ></Image>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Restaurants;
