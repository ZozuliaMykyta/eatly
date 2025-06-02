"use client";
import AuthBtns from "@/components/auth/AuthBtns";
import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import foodImage from "@/assets/img/auth/auth-demonstr.png";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      console.log("Access token:", accessToken);
      localStorage.setItem("accessToken", accessToken);
      setToken(accessToken);

      // убираем accessToken из URL
      router.replace("/");
    }
  }, [searchParams, router]);
  return (
    // <div className="flex justify-between min-h-screen">
    //   <div className="relative px-[48px] pt-[32px] pb-[48px] flex flex-col flex-[53%]">
    //     <Link href="/">
    //       <Image
    //         src="/assets/img/favicon.svg"
    //         alt="ealty's logo"
    //         width={46}
    //         height={42}
    //         className="absolute top-[32px] left-[48px] z-10"
    //       ></Image>
    //     </Link>
    //     <div className="flex flex-col flex-grow min-h-0 justify-center">
    //       <div className="text-center">
    //         <h2 className="text-[rgb(50,49,66)] text-[36px] leading-[125%]">
    //           Sign Up To eatly
    //         </h2>
    //         <AuthBtns />
    //         <h3 className="text-[20px] text-[rgba(0,90,100,0.35)] uppercase mt-[33px] font-medium">
    //           or
    //         </h3>
    //         <SignUpForm />
    //         <h3 className="mt-[24px] capitalize tetx-[19px] font-bold leading-7">
    //           already have an account?{" "}
    //           <Link href="#!" className="text-purple">
    //             log in
    //           </Link>
    //         </h3>
    //       </div>
    //     </div>
    //     <div className="flex justify-between items-center mt-auto">
    //       <h5 className="text-[rgb(113,128,150)] leading-[150%]">
    //         Privacy Policy
    //       </h5>
    //       <h5 className="text-[rgb(113,128,150)] leading-[150%]">
    //         Copyright 2022
    //       </h5>
    //     </div>
    //   </div>
    //   <div className="hidden relative bg-purple flex-[47%] text-center md:flex flex-col justify-center items-center">
    //     <Image src={foodImage} alt="food image" className="mr-[-65px]"></Image>
    //     <h2 className="text-[40px] text-white font-manrope font-extrabold leading-[110%] mt-[50px]">
    //       Find Foods With Love
    //     </h2>
    //     <p className="text-[14px] text-white font-manrope font-medium leading-[150%] mt-[20px] max-w-[500px]">
    //       Eatly Is The Food Delivery Dashboard And Having More Than 2K+ Dishes
    //       Including Asian, Chinese, Italians And Many More. Our Dashboard Helps
    //       You To Manage Orders And Money.
    //     </p>
    //   </div>
    // </div>
    <div className="flex md:flex-row justify-between min-h-screen">
      {/* Левая часть */}
      <div className="relative px-6 sm:px-8 md:px-[48px] pt-6 sm:pt-8 md:pt-[32px] pb-8 sm:pb-10 md:pb-[48px] flex flex-col w-full md:flex-[53%]">
        <Link href="/">
          <Image
            src="/assets/img/favicon.svg"
            alt="eatly's logo"
            width={46}
            height={42}
            className="absolute top-6 sm:top-8 md:top-[32px] left-6 sm:left-8 md:left-[48px] z-10"
          />
        </Link>
        <div className="flex flex-col flex-grow min-h-0 justify-center">
          <div className="text-center">
            <h2 className="text-[rgb(50,49,66)] text-2xl sm:text-3xl md:text-[36px] leading-[125%]">
              Sign Up To eatly
            </h2>
            <AuthBtns />
            <h3 className="text-base sm:text-lg md:text-[20px] text-[rgba(0,90,100,0.35)] uppercase mt-6 sm:mt-8 md:mt-[33px] font-medium">
              or
            </h3>
            <SignUpForm />
            <h3 className="mt-6 sm:mt-8 md:mt-[24px] capitalize text-base sm:text-lg md:text-[19px] font-bold leading-7">
              already have an account?{" "}
              <Link href="#!" className="text-purple">
                log in
              </Link>
            </h3>
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <h5 className="text-[rgb(113,128,150)] leading-[150%]">
            Privacy Policy
          </h5>
          <h5 className="text-[rgb(113,128,150)] leading-[150%]">
            Copyright 2022
          </h5>
        </div>
      </div>
      <div className="hidden min-[900px]:flex relative bg-purple flex-[47%] text-center flex-col justify-center items-center px-6 py-10">
        <Image
          src={foodImage}
          alt="food image"
          className="w-full max-w-[400px] md:max-w-[500px] mr-0 md:mr-[-65px]"
        />
        <h2 className="text-2xl sm:text-3xl md:text-[40px] text-white font-manrope font-extrabold leading-[110%] mt-6 md:mt-[50px]">
          Find Foods With Love
        </h2>
        <p className="text-sm sm:text-base text-white font-manrope font-medium leading-[150%] mt-4 md:mt-[20px] max-w-[500px] px-2">
          Eatly Is The Food Delivery Dashboard And Having More Than 2K+ Dishes
          Including Asian, Chinese, Italians And Many More. Our Dashboard Helps
          You To Manage Orders And Money.
        </p>
      </div>
    </div>
  );
};

export default page;
