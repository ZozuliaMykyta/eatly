"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);

  const menuList = [
    {
      id: 1,
      link: "menu",
    },
    {
      id: 2,
      link: "blog",
    },
    {
      id: 3,
      link: "pricing",
    },
    {
      id: 4,
      link: "contact",
    },
  ];
  return (
    <header className="header px-[15px]">
      <div className="pt-[47px]! pb-[25px]! px-0! container flex justify-between items-center border-b-1 border-[#cbcbcb]">
        <div className="flex gap-[50px] sm:gap-[102px] ">
          <Link className="flex items-center gap-[11px]" href="/">
            <Image
              src="/assets/img/favicon.svg"
              alt="eatly"
              width={46}
              height={42}
              priority
            />
            <span className="text-[22px] leading-[1.3] text-purple font-semibold">
              eatly
            </span>
          </Link>
          <ul className="hidden lg:flex items-center gap-[54px]">
            {menuList.map((item) => (
              <li key={item.id}>
                <Link
                  className="relative text-[18px] text-gray leading-[26px] font-inter font-medium capitalize hover:text-purple transition-all duration-300 group"
                  href={`/${item.link.toLowerCase()}`}
                >
                  <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
                  {item.link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex gap-x-[36px] items-center">
          <Link
            href="#!"
            className="relative text-[18px] text-gray leading-[26px] font-bold capitalize hover:text-purple transition-all duration-300 group"
          >
            <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
            login
          </Link>
          <Link
            href="#!"
            className="text-[18px] leading-[26px] font-bold capitalize rounded-[18px] bg-purple text-lighwhite py-[17px] px-[25px] border-2 border-purple transition-all duration-300 hover:bg-white hover:text-purple"
          >
            sing up
          </Link>
        </div>
        <button
          onClick={() => setIsOpenBurger(!isOpenBurger)}
          className="relative flex flex-col items-center justify-center gap-2 lg:hidden z-50 w-9 h-9"
        >
          <span
            className={`block h-0.5 w-9 bg-gray-600 transition-transform duration-300 ${
              isOpenBurger ? "rotate-45 translate-y-2.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-9 bg-gray-600 transition-opacity duration-300 ${
              isOpenBurger ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-9 bg-gray-600 transition-transform duration-300 ${
              isOpenBurger ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          ></span>
        </button>

        <div
          className={`${
            isOpenBurger ? "translate-x-[0]" : "translate-x-[-110%]"
          } header__menu fixed top-0 left-0 w-full bg-white z-20 transition-all duration-500 flex flex-col items-center justify-center text-center`}
        >
          <nav className="mt-[100px]">
            <ul>
              {menuList.map((item) => (
                <li key={item.id} className="not-last:mb-[15px]">
                  <Link
                    className="relative text-[18px] text-gray leading-[26px] font-inter font-medium capitalize hover:text-purple transition-all duration-300 group"
                    href={`/${item.link.toLowerCase()}`}
                  >
                    <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
                    {item.link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-x-[36px] items-center mt-15">
            <Link
              href="#!"
              className="relative text-[18px] text-gray leading-[26px] font-bold capitalize hover:text-purple transition-all duration-300 group mb-5"
            >
              <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
              login
            </Link>
            <Link
              href="#!"
              className="text-[18px] leading-[26px] font-bold capitalize rounded-[18px] bg-purple text-lighwhite py-[17px] px-[25px] border-2 border-purple transition-all duration-300 hover:bg-white hover:text-purple"
            >
              sing up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
