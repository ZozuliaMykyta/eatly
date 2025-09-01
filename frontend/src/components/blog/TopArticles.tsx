"use client";
import { useGetArticlesQuery } from "@/lib/services/api";
import React from "react";
import Article from "./ArticleCard";

const TopArticles = () => {
  const { data, error, isLoading } = useGetArticlesQuery();

  if (isLoading) {
    return (
      <div className="text-center">
        <h3 className="mb-4 md:mb-6 lg:mb-[34px] text-[rgb(37,37,37)] text-lg md:text-xl lg:text-[30px] leading-6 md:leading-8 lg:leading-[44px]">
          Top Articles
        </h3>
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center">
        <h3 className="mb-4 md:mb-6 lg:mb-[34px] text-[rgb(37,37,37)] text-lg md:text-xl lg:text-[30px] leading-6 md:leading-8 lg:leading-[44px]">
          Top Articles
        </h3>
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }
  return (
    <div className="lg:border-l-[1px] lg:border-l-[#9B9B9B] lg:pl-[46px] lg:pt-2 lg:pb-2">
      <h3 className="mb-4 md:mb-6 lg:mb-[34px] text-[rgb(37,37,37)] text-lg md:text-xl lg:text-[30px] leading-6 md:leading-8 lg:leading-[44px]">
        Top Articles
      </h3>
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-14">
        {data &&
          data
            .slice(0, 3)
            .map((article) => <Article key={article._id} article={article} />)}
      </div>
    </div>
  );
};

export default TopArticles;
