"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import customer from "@/assets/img/home/customer.jpeg";
import quotes from "@/assets/img/icons/quotes.svg";
import { Pagination } from "swiper/modules";

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
      <div className="container relative">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          <span className="text-purple">Customer</span> Say
        </h3>
        <Swiper
          modules={[Pagination]}
          pagination={{ type: "progressbar", el: ".my-progress-bar" }}
          spaceBetween={46}
          slidesPerView={2}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="mt-[80px] !overflow-visible relative"
          grabCursor={true}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 46,
            },
          }}
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide
              className="rounded-[20px] bg-white px-[43px] py-[40px] shadow-2xl"
              key={index}
            >
              {(index === activeSlide ||
                (activeSlide === 3 && index === 4)) && (
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
        <div
          className={`my-progress-bar !rounded-[50px] !h-[11px] !bg-[rgba(108,95,188,0.2)] !absolute bottom-[-50px] !left-auto !top-auto !right-[15px] max-w-[500px]`}
        ></div>
      </div>
    </section>
  );
};

export default Customer;
