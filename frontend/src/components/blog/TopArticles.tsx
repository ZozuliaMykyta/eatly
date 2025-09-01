"use client";
import { useGetArticlesQuery } from "@/lib/services/api";
import React from "react";
import Article from "./ArticleCard";

const TopArticles = () => {
  const { data, error, isLoading } = useGetArticlesQuery();

  if (isLoading) {
    return (
      <div className="container text-center !mt-5">
        <h3 className="mb-[34px] text-[rgb(37,37,37)] text-[30px] leading-[44px]">
          Top Articles
        </h3>
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container text-center !mt-5">
        <h3 className="mb-[34px] text-[rgb(37,37,37)] text-[30px] leading-[44px]">
          Top Articles
        </h3>
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }
  return (
    <div className="custom-border-l">
      <h3 className="mb-[34px] text-[rgb(37,37,37)] text-[30px] leading-[44px]">
        Top Articles
      </h3>
      <div className="flex flex-col gap-14">
        {data &&
          data
            .slice(0, 3)
            .map((article) => <Article key={article._id} article={article} />)}
      </div>
    </div>
  );
};

export default TopArticles;
