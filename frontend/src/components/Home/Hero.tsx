import React from "react";
import Image from "next/image";
import Link from "next/link";
import food from "@/assets/img/home/hero.jpeg";

const Hero = () => {
  return (
    <section className="hero mt-[57px] min-[900px]:mt-[80px]">
      <div className="container flex items-center gap-[73px] flex-col min-[900px]:flex-row text-center min-[900px]:text-left mb-[75px]! md:mb-[90px]! lg:mb-[130px]!">
        <div>
          <h6 className="inline-block relative text-[15px] leading-[1.2] tracking-[2px] text-[rgba(32,31,31,0.2)] pl-[74px]">
            <span className="absolute top-[50%] left-0 w-[54px] h-[1px] bg-[rgb(32,31,31)] opacity-[0.2]"></span>
            over 1000 users
          </h6>
          <h1 className="text-[36px] mt-[18px] md:text-[46px] lg:text-[54px] xl:text-[70px] leading-[120%] max-w-none min-[900px]:max-w-[600px]">
            Enjoy Foods All Over The <span className="text-purple">World</span>
          </h1>
          <p className="font-inter text-[18px] font-normal leading-[28px] mt-[16px] max-w-none min-[900px]:max-w-[500px]">
            EatLy help you set saving goals, earn cash back offers, Go to
            disclaimer for more details and get paychecks up to two days early.
            Get a{" "}
            <Link href="#!" className="text-purple">
              $20 bonus.
            </Link>
          </p>
          <div className="mt-[41px] md:mt-[53px] flex items-center gap-[18px] justify-normal max-[900px]:justify-center">
            <button className="capitalize purple-btn rounded-[12px] leading-[24px] tracking-[1%] font-medium text-[16px] px-[30px] py-[18px]">
              get started
            </button>
            <button className="cursor-pointer capitalize rounded-[12px] leading-[24px] tracking-[1%] font-medium text-[16px] text-purple border-2 border-purple transition-all duration-300 hover:bg-purple hover:text-white px-[28px] py-[18px] active:scale-95 active:shadow-lg">
              go pro
            </button>
          </div>
          <div className="mt-[30px] flex items-end gap-[20px] justify-normal max-[900px]:justify-center">
            <div>
              <Image
                width={123}
                height={30}
                priority
                src="/assets/img/trustpilot.svg"
                alt="trustpilot"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Image
                    width={18}
                    height={17}
                    src="/assets/img/star.svg"
                    alt="star"
                    key={index}
                  />
                ))}
              </div>
              <span className="text-[16px] font-medium leading-6 text-[rgb(51,65,85)]">
                4900+
              </span>
            </div>
          </div>
        </div>
        <div>
          <Image src={food} alt="food" priority width={680} height={638} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
