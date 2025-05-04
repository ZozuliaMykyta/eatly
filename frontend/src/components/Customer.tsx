"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const Customer = () => {
  const [activeSlide, setActiveSlide] = useState<number>();
  const review =
    "“ Online invoice payment helps companies save time, are faster and save maximum effort for the clients and save maximum effort. Online invoice payment helps companies save time ”";

  const reviewSliderData = {
    name: "Alexander R.",
    date: 1,
    review: review,
  };
  return (
    <section className="mt-[50px] md:mt-[116px]">
      <div className="container">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          <span className="text-purple">Customer</span> Say
        </h3>
        <Swiper
          spaceBetween={50}
          slidesPerView={2.3}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="mt-[80px]"
        >
          {[...Array(5)].map((item, index) => (
            <SwiperSlide
              // className={`bg-amber-400 ${
              //   activeSlide === index ? "bg-amber-950" : ""
              // }`}
              className="rounded-[20px]bg-white px-[43px] py-[40px] shadow-2xl"
              key={index}
            >
              <p className="mb-[40px] italic text-[18px] fomt-normal leading-[26px] text-[rgb(99,99,99)]">
                {reviewSliderData.review}
              </p>
              <div className="flex items-center gap-x-[6px]">
                {[...Array(5)].map((_, index) => (
                  <Image
                    width={18}
                    height={17}
                    src="/assets/img/star.svg"
                    alt="star"
                    key={index}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Customer;
