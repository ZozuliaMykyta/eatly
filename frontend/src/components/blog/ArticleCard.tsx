import { IArticles } from "@/interfaces/IArticles";
import Image from "next/image";
import React from "react";
import personAvatar from "@/assets/img/blog/icons/articlePerson.svg";

type ArticleProps = {
  article: IArticles;
};
const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div
      className="inline-block bg-white rounded-[16px] pt-6 pb-7 px-5 text-left"
      style={{
        boxShadow: "0px 3.91px 46.86px 0px rgba(197, 197, 197, 0.25)",
      }}
    >
      <div className="relative max-h-[250px] aspect-[310/272]">
        <Image
          src={article.img}
          alt="Article's image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 310px"
          fill
          className="object-cover"
        />
      </div>
      <h4 className="text-[rgb(37,37,37)] text-[21px] leading-[25px] mt-[22px]">
        {article.article}
      </h4>
      <div className="mt-[20px] flex items-end justify-between">
        <div className="flex items-center gap-2.5">
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
        <h6 className="text-[rgb(183,180,180)] text-[16px] font-medium leading-[32px]">
          15 dec, 2022
        </h6>
      </div>
    </div>
  );
};

export default Article;
