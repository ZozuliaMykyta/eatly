import { IArticles } from "@/interfaces/IArticles";
import Image from "next/image";
import React from "react";
import personAvatar from "@/assets/img/blog/icons/articlePerson.svg";
import Link from "next/link";

type ArticleProps = {
  article: IArticles;
};
const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <Link
      href={`blogs/${article._id}`}
      className="inline-block bg-white rounded-[16px] pt-4 md:pt-6 pb-5 md:pb-7 px-4 md:px-5 text-left w-full max-w-none"
      style={{
        boxShadow: "0px 3.91px 46.86px 0px rgba(197, 197, 197, 0.25)",
      }}
    >
      <div className="relative h-[272px] w-full">
        <Image
          src={article.img}
          alt="Article's image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 310px"
          fill
          className="object-cover rounded-lg"
          quality={100}
          priority
        />
      </div>
      <h4 className="text-[rgb(37,37,37)] text-base md:text-lg lg:text-[21px] leading-5 md:leading-6 lg:leading-[25px] mt-4 md:mt-5 lg:mt-[22px]">
        {article.article}
      </h4>
      <div className="mt-4 md:mt-5 lg:mt-[20px] flex items-end justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={personAvatar}
            alt="Person's avatar"
            className="w-6 h-6 md:w-8 md:h-8"
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
        <h6 className="text-[rgb(183,180,180)] text-sm md:text-[16px] font-medium leading-[32px]">
          15 dec, 2022
        </h6>
      </div>
    </Link>
  );
};

export default Article;
