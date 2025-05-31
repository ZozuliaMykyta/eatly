"use client";
import AuthBtns from "@/components/auth/AuthBtns";
import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
    <div className="flex justify-between min-h-screen">
      <div className="relative px-[48px] pt-[32px] pb-[48px] flex flex-col flex-[53%]">
        <Link href="/">
          <Image
            src="/assets/img/favicon.svg"
            alt="ealty's logo"
            width={46}
            height={42}
            className="absolute top-[32px] left-[48px] z-10"
          ></Image>
        </Link>
        <div className="flex flex-col flex-grow min-h-0 justify-center">
          <div className="text-center">
            <h2 className="text-[rgb(50,49,66)] text-[36px] leading-[125%]">
              Sign Up To eatly
            </h2>
            <AuthBtns />
            <h3 className="text-[20px] text-[rgba(0,90,100,0.35)] uppercase mt-[33px] font-medium">
              or
            </h3>
            <SignUpForm />
            <h3 className="mt-[24px] capitalize tetx-[19px] font-bold leading-7">
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
      <div className="relative bg-purple flex-[47%]">
        <h2>Find Foods With Love</h2>
      </div>
    </div>
  );
};

export default page;
