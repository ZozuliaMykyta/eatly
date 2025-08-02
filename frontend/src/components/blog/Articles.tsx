"use client";
import { useGetArticlesQuery } from "@/lib/services/api";
import React from "react";
import Article from "./Article";

const Articles: React.FC = () => {
  const { data, error, isLoading } = useGetArticlesQuery();
  return (
    <div className="container !mt-[105px]">
      <h2 className="text-center text-[45px] leading-[120%]">
        Latest <span className="text-purple">Articles</span>
      </h2>
      {data &&
        data.map((article) => <Article article={article} key={article._id} />)}
    </div>
  );
};

export default Articles;
