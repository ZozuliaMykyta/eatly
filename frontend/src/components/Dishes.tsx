"use client";
import { useGetDishesQuery } from "@/lib/services/api";
import Image from "next/image";
import React, { useState } from "react";
import plus from "@/assets/img/icons/plus.svg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";

const Dishes = () => {
  const { data, error, isLoading } = useGetDishesQuery();
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  const toggleLiked = (id: string) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  if (isLoading) {
    return (
      <div className="container text-center custom-border-b">
        <h3 className="capitalize text-[45px] leading-[45px] text-center">
          our top <span className="text-purple">dishes</span>
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
    <section className="mt-[50px] lg:mt-[100px] custom-border-b">
      <div className="container">
        <h3 className="capitalize text-[45px] leading-[45px] text-center">
          our top <span className="text-purple">dishes</span>
        </h3>
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-[14px] min-w-[1100px]:gap-[30px] mt-[50px] lg:mt-[76px]">
          {data?.map((item) => (
            <div
              key={item._id}
              className="relative border-[1px] border-[rgb(244,244,246)] px-[20px] py-[32px] rounded-[35px]"
              style={{
                boxShadow:
                  "6.85px 82.18px 41.09px 0px rgba(229, 229, 229, 0.7)",
              }}
            >
              <div
                onClick={() => toggleLiked(item._id)}
                className="absolute top-[22px] right-[22px] cursor-pointer select-none"
              >
                {likedItems[item._id] ? (
                  <FaHeart className="w-5 h-5 text-red-500 transition-colors" />
                ) : (
                  <FaRegHeart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                )}
              </div>
              <Image
                src={item.image}
                alt={item.title}
                width={182}
                height={183}
              ></Image>
              <h6
                className="text-[12px] font-normal leading-[17px] inline-block py-0.5 px-[7px] rounded-[5px] mt-[5px]"
                style={{ backgroundColor: getThemeBg(item.theme) }}
              >
                {item.theme}
              </h6>
              <h5 className="mt-[5px] text-[rgb(50,49,66)] text-[23px] leading-[37px]">
                {item.title}
              </h5>
              <div className="flex items-center gap-1.5">
                <p className="text-[17px] font-manrope leading-[23px] font-normal text-[rgb(142,151,166)]">
                  {item.time}
                </p>
                <div className="flex items-center gap-0.5">
                  <Image
                    src="/assets/img/purple-star.svg"
                    alt="star"
                    height={24}
                    width={24}
                  ></Image>
                  <p className="text-[17px] font-manrope leading-[23px] font-normal text-[rgb(142,151,166)] mt-[1px]">
                    {item.rating}
                  </p>
                </div>
              </div>
              <div className="mt-[10px] flex items-center justify-between">
                <div className="text-[18px] font-bold leading-[40px] font-manrope">
                  {`$${item.price}`}
                </div>
                <button className="group  px-[14px] py-[12px] bg-[rgb(50,49,66)] rounded-[9px] cursor-pointer">
                  <Image
                    src={plus}
                    alt="plus"
                    width={15}
                    height={15}
                    className="transition-transform duration-300 group-hover:scale-[1.2]"
                  ></Image>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center lg:text-right mt-[65px]">
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

export default Dishes;
