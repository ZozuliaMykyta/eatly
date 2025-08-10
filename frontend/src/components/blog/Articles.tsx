"use client";
import { useGetArticlesQuery } from "@/lib/services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import Article from "./ArticleCard";
import { Navigation } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const Articles: React.FC = () => {
  const { data, error, isLoading } = useGetArticlesQuery();
  return (
    <div className="container !mt-[105px]">
      <h2 className="text-center text-[45px] leading-[120%]">
        Latest <span className="text-purple">Articles</span>
      </h2>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".article-next",
          prevEl: ".article-prev",
        }}
        spaceBetween={46}
        slidesPerView={3}
        // onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        grabCursor={true}
        className="justify-center items-center text-center"
        // breakpoints={{
        //   320: {
        //     slidesPerView: 1,
        //     spaceBetween: 32,
        //   },
        //   600: {
        //     slidesPerView: 1.3,
        //   },
        //   1024: {
        //     slidesPerView: 2,
        //     spaceBetween: 46,
        //   },
        // }}
      >
        {data &&
          data.map((article) => (
            <SwiperSlide key={article._id}>
              <Article article={article} />
            </SwiperSlide>
          ))}
        <div className="article-prev">
          <FaArrowLeft />
        </div>
        <div className="article-next">
          <FaArrowRight />
        </div>
      </Swiper>
    </div>
  );
};

export default Articles;
