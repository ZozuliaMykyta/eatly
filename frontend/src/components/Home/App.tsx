import Image from "next/image";
import React from "react";
import mobileApp from "@/assets/img/home/App-Mobile.jpeg";
import mobileIllustr from "@/assets/img/home/icons/app-mob-illu.svg";
import arrow from "@/assets/img/icons/arrow.svg";
import btnIllustr from "@/assets/img/home/icons/app-btn-illu.svg";

const App = () => {
  const appList = [
    {
      id: 1,
      text: "Premium quality food is made with ingredients that are packed with essential vitamins, minerals.",
    },
    {
      id: 2,
      text: "These foods promote overall wellness by support healthy digestion and boosting immunity",
    },
  ];
  return (
    <section>
      <div className="container custom-border-b flex items-center justify-between flex-col-reverse md:flex-row gap-[110px] md:gap-[80px] my-[67px]! md:my-[120px]! text-center md:text-left">
        <div className="relative lg:ml-[112px]">
          <Image
            src={mobileIllustr}
            alt="illustration"
            className="hidden md:block absolute top-[-20px] right-[-70px]"
          />
          <Image
            src={mobileApp}
            alt="mobile app"
            className="w-[178px] h-[340px] md:w-[216px] md:h-[433px]"
          />
        </div>
        <div>
          <h2 className="text-[32px] md:text-[40px] lg:text-[50px] font-bold leading-[42px] md:leading-[58px] md:max-w-[500px] capitalize">
            premium <span className="text-purple">quality</span> for your health
          </h2>
          <ul className="mt-[28px] lg:mt-[64px]">
            {appList.map((item) => (
              <li
                className="text-left pl-[20px] relative before:absolute before:w-1.5 before:h-1.5 before:bg-gray before:rounded-full before:left-1 before:top-[12px] font-inter leading-[30px] font-normal text-[rgb(103,103,103)] max-w-[550px] mb-4 md:mb-[28px] last:mb-0"
                key={item.id}
              >
                {item.text}
              </li>
            ))}
          </ul>
          <div className="inline-block relative">
            <button
              name="download"
              className="peer group flex gap-[15px] items-center bg-purple text-white capitalize mt-[60px] cursor-pointer text-[18px] font-medium leading-[22px] rounded-[14px] py-5 px-[28px] active:scale-95 active:shadow-lg"
            >
              download
              <Image
                src={arrow}
                alt="arrow"
                className="group-hover:translate-x-[4px] transition-all duration-300"
              />
            </button>
            <Image
              src={btnIllustr}
              alt="arrow"
              className="absolute bottom-[-90px] md:bottom-[-45px] max-[768px]:left-[-110px] md:right-[-140px] rotate-[100deg] peer-hover:rotate-[110deg] md:rotate-[0deg] md:peer-hover:rotate-[15deg] transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
