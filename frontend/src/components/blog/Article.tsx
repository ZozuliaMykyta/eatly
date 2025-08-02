import { IArticles } from "@/interfaces/IArticles";
import Image from "next/image";
import React from "react";
import personAvatar from "@/assets/img/blog/icons/articlePerson.svg";

type ArticleProps = {
  article: IArticles;
};
const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div>
      <div className="relative max-h-[250px] aspect-[310/272]">
        <Image
          src={article.img}
          alt="Article's image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 310px"
          fill
          className="object-cover"
        />
      </div>
      <h4 className="text-[rgb(37,37,37)] text-[21px] leading-[25px]">
        {article.article}
      </h4>
      <div>
        <div>
          <Image src={personAvatar} alt="Person's avatar" />
          <div>
            <span className="text-[gb(141,141,141)] text-[12px] font-normal leading-[18px]">
              Written By
            </span>
            <h6 className="mt-0.5 text-black text-[17px] leading-[26px] font-medium">
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
