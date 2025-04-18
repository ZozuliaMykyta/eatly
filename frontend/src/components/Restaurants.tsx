"use client";
import { useGetRestaurantsQuery } from "@/lib/services/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Restaurants = () => {
  const { data, error, isLoading } = useGetRestaurantsQuery();
  const router = useRouter();

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
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          our top <span className="text-purple">restaurants</span>
        </h3>
        <div className="mt-[50px] md:mt-[86px] grid grid-rows-3 min-[900px]:grid-rows-1 grid-cols-1 min-[900px]:grid-cols-3 justify-between gap-[30px] items-center">
          {data?.slice(0, 3).map((item) => (
            <div
              onClick={() => router.push(`/restaurants/${item._id}`)}
              key={item._id}
              style={{
                boxShadow:
                  "5.95px 71.35px 35.67px 0px rgba(229, 229, 229, 0.7)",
              }}
              className="relative rounded-[30px] cursor-pointer transition-all duration-300 hover:scale-[1.1] bg-white border-[1.25px] border-[rgb(244,244,246)] shadow-(5.95px 71.35px 35.67px 0px rgba(229, 229, 229, 0.7))"
            >
              <div className="relative w-full max-h-[250px] aspect-[396/176]">
                <Image
                  src={item.img}
                  alt={item.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 396px"
                  fill
                  className="object-cover rounded-lg rounded-t-[30px]"
                />
              </div>
              <div className="px-[34px] pt-[11px] pb-[18px]">
                <span
                  className="font-normal leading-[19px] text-[12px] px-2 py-0.5 rounded-[5px]"
                  style={{ backgroundColor: getThemeBg(item.theme) }}
                >
                  {item.theme}
                </span>
                <h5 className="text-[20px] min-[900px]:text-[20px] min-[1110px]:text-[26px] leading-[42px] mt-1 text-[rgb(50,49,66)]">
                  {item.title}
                </h5>
                <div className="flex items-center gap-5">
                  <p className="text-[20px] font-manrope leading-[26px] font-normal text-[rgb(142,151,166)]">
                    {item.delivery_time}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/assets/img/purple-star.svg"
                      alt="star"
                      height={24}
                      width={24}
                    ></Image>
                    <p className="text-[20px] font-manrope leading-[26px] font-normal text-[rgb(142,151,166)] mt-[1px]">
                      {item.rating}
                    </p>
                  </div>
                </div>
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
