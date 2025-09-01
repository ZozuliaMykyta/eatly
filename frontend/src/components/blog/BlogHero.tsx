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
      <div className="text-center">
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center">
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }
  if (!article) {
    return <div>The article not found</div>;
  }

  return (
    <div>
      <h1 className="capitalize text-2xl md:text-3xl lg:text-[37px] leading-tight">
        how to order good in eatly?
      </h1>
      <div className="flex items-center gap-2.5 mt-6 md:mt-8">
        <Image
          src={personAvatar}
          alt="Person's avatar"
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <div>
          <span className="text-[rgb(141,141,141)] text-[10px] md:text-[12px] font-normal leading-[18px]">
            Written By
          </span>
          <h6 className="text-black text-sm md:text-[17px] leading-[26px] font-medium">
            Perperzon
          </h6>
        </div>
      </div>
      <div>
        {article.titles.map((title, key) => (
          <div key={key}>
            <h3 className="mt-6 md:mt-12 lg:mt-[90px] leading-6 md:leading-8 lg:leading-[44px] text-lg md:text-xl lg:text-[33px] uppercase text-[#252525]">
              {title}
            </h3>
            <p className="mt-4 md:mt-6 lg:mt-[35px] font-normal leading-5 md:leading-6 lg:leading-[44px] text-[#252525] text-sm md:text-base lg:text-[22px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
              aut suscipit impedit esse fugit ipsa debitis, temporibus
              reprehenderit enim provident aspernatur repellendus dolorum nulla
              dolorem corrupti necessitatibus et molestiae, inventore tenetur
              sequi pariatur? Perspiciatis quae sunt, atque iusto a eos! Dolore
              magni autem fuga vel ab dolorem cupiditate aut eos?
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHero;
