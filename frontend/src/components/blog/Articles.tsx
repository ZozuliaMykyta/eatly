"use client";
import { useGetArticlesQuery } from "@/lib/services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import Article from "./ArticleCard";
import { Navigation } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const Articles: React.FC = () => {
  const { data, error, isLoading } = useGetArticlesQuery();

  if (isLoading) {
    return (
      <div className="container text-center custom-border-b !mt-[150px] min-[500px]:!mt-[210px] min-[900px]:!mt-[105px] ">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          Latest <span className="text-purple">Articles</span>
        </h3>
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container text-center custom-border-b !mt-[150px] min-[500px]:!mt-[210px] min-[900px]:!mt-[105px]">
        <h3 className="capitalize text-center text-[45px] leading-[45px]">
          Latest <span className="text-purple">Articles</span>
        </h3>
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }

  return (
    <div className="container !mt-[150px] min-[500px]:!mt-[210px] min-[900px]:!mt-[105px]">
      <h2 className="text-center text-[25px] min-[500px]:text-[45px] leading-[120%]">
        Latest <span className="text-purple">Articles</span>
      </h2>
      <Swiper
        data-testid="swiper"
        modules={[Navigation]}
        navigation={{
          nextEl: ".article-next",
          prevEl: ".article-prev",
        }}
        spaceBetween={46}
        slidesPerView={3}
        grabCursor={true}
        className="justify-center items-center text-center mt-[20px] min-[500px]:mt-[70px]"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 32,
          },
          720: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 46,
          },
        }}
      >
        {data &&
          data.map((article) => (
            <SwiperSlide key={article._id} data-testid="swiper-slide">
              <Article article={article} />
            </SwiperSlide>
          ))}
        <div className="flex justify-center items-center gap-8 mt-[50px] min-[500px]:mt-[100px]">
          <FaArrowLeft className="article-btns article-prev text-4xl" />
          <FaArrowRight className="article-btns article-next text-4xl" />
        </div>
      </Swiper>
    </div>
  );
};

export default Articles;
