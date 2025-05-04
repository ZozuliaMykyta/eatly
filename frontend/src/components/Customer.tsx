"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import customer from "@/assets/img/home/customer.jpeg";
import quotes from "@/assets/img/icons/quotes.svg";

const Customer = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
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
          slidesPerView={2}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="mt-[80px] !overflow-visible"
          grabCursor={true}
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide
              className="rounded-[20px] bg-white px-[43px] py-[40px] shadow-2xl"
              key={index}
            >
              {(index === activeSlide ||
                (activeSlide === 5 - 2 && index === 5 - 1)) && (
                <div className="mb-[32px] flex items-center justify-between">
                  <div className="flex items-center gap-[20px]">
                    <Image
                      src={customer}
                      alt={reviewSliderData.name}
                      width={71.04}
                      height={71.04}
                    ></Image>
                    <div>
                      <h4>{reviewSliderData.name}</h4>
                      <h6 className="capitalize">
                        {reviewSliderData.date} year with us
                      </h6>
                    </div>
                  </div>
                  <Image
                    src={quotes}
                    alt="quotes"
                    width={58}
                    height={44}
                  ></Image>
                </div>
              )}
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
