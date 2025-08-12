"use client";
import { useGetArticlesQuery } from "@/lib/services/api";
import Image from "next/image";
import React from "react";

const BlogHero = ({ slug }: { slug: string }) => {
  const { data, error, isLoading } = useGetArticlesQuery();
  const article = data?.find((item) => item._id === slug);

  if (isLoading) {
    return (
      <div className="container text-center custom-border-bx">
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container text-center custom-border-b">
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }
  if (!article) {
    return <div>The article not found</div>;
  }

  return (
    <div className="container">
      <h1 className="capitalize text-[37px] ">how to order good in eatly?</h1>
      <div>
        <div className="relative h-[250px] aspect-[310/272]">
          <Image
            src={article.img}
            alt="Article's image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 310px"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span>Written By</span>
          <h6>Perperzon</h6>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
