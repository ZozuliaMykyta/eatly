"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

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
          slidesPerView={3}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        >
          {[...Array(5)].map((item, index) => (
            <SwiperSlide
              className={`bg-amber-400 ${
                activeSlide === index ? "bg-amber-950" : ""
              }`}
              key={index}
            >
              <p>{reviewSliderData.review}</p>
              <div>
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
