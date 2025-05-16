import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-between min-h-screen">
      <div className="relative px-[48px] pt-[32px] pb-[48px] flex flex-col items-center justify-center flex-[53%]">
        <Image
          src="/assets/img/favicon.svg"
          alt="ealty's logo"
          width={46}
          height={42}
          className="absolute top-[32px] left-[48px] z-10"
        ></Image>
        <div className="text-center">
          <h2 className="text-[rgb(50,49,66)] text-[36px] leading-[125%]">
            Sign Up To eatly
          </h2>
          <div className="mt-[48px] flex items-center gap-5">
            <button className="auth-btn">
              <Image
                src="/assets/img/auth/Google.svg"
                alt="google account icon"
                width={27}
                height={28}
              ></Image>
            </button>
            <button className="auth-btn">
              <Image
                src="/assets/img/auth/apple.svg"
                alt="apple id icon"
                width={26}
                height={31}
              ></Image>
            </button>
          </div>
          <h3 className="text-[20px] text-[rgba(0,90,100,0.35)] uppercase mt-[33px] font-medium">
            or
          </h3>
          <form className="flex flex-col mt-[36px]">
            <div>
              <input type="text" name="full-name" />
            </div>
            <div>
              <input type="email" name="email" />
            </div>
            <div>
              <input type="password" name="password" />
            </div>
            <button>sign up</button>
          </form>
          <h3>
            already have an account? <span>log in</span>
          </h3>
          <div className="flex justify-between">
            <h5>Privacy Policy</h5>
            <h5>Copyright 2022</h5>
          </div>
        </div>
      </div>
      <div className="relative bg-purple flex-[47%]">
        <h2>Find Foods With Love</h2>
      </div>
    </div>
  );
};

export default page;
