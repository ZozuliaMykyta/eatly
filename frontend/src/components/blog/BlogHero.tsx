"use client";
import { useGetArticlesQuery } from "@/lib/services/api";
import Image from "next/image";
import React from "react";
import personAvatar from "@/assets/img/blog/icons/articlePerson.svg";

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
    <div className="container !mt-[126px]">
      <h1 className="capitalize text-[37px] ">how to order good in eatly?</h1>
      <div className="flex items-center gap-2.5 mt-8">
        <Image src={personAvatar} alt="Person's avatar" />
        <div>
          <span className="text-[rgb(141,141,141)] text-[12px] font-normal leading-[18px]">
            Written By
          </span>
          <h6 className="text-black text-[17px] leading-[26px] font-medium">
            Perperzon
          </h6>
        </div>
      </div>
      <div className="relative h-[250px] aspect-[310/272] mt-[62px]">
        <Image
          src={article.img}
          alt="Article's image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 310px"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default BlogHero;
