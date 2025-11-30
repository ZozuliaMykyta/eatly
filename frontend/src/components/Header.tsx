"use client";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

const Header = () => {
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<{
    id: string;
    jwtSecureCode: string;
  } | null>(null);

  useEffect(() => {
    // Check both token and accessToken for backward compatibility
    const storedToken =
      localStorage.getItem("accessToken") || localStorage.getItem("token");
    setToken(storedToken);

    // Listen for storage changes (token updates)
    const handleStorageChange = () => {
      const updatedToken =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      setToken(updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ id: string; jwtSecureCode: string }>(
        token
      );
      setDecodedToken(decodedToken);
    }
  }, [token]);

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
      id: 5,
      link: "cart",
    },
  ];
  return (
    <header className="header">
      <div className="container pt-[47px]!">
        <div className="flex justify-between items-center border-b border-[#cbcbcb] pb-[25px]">
          <div className="flex gap-[50px] sm:gap-[102px]">
            <Link className="flex items-center gap-[11px]" href="/">
              <Image
                src="/assets/img/favicon.svg"
                alt="eatly"
                width={46}
                height={42}
              />
              <span className="text-[22px] leading-[130%] text-purple font-semibold">
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
          {token && decodedToken ? (
            <Link
              href={`/user/${decodedToken.jwtSecureCode}`}
              className="hidden lg:flex gap-x-[36px] items-center"
            >
              <IoPersonCircleSharp className="text-[40px] hover:text-purple transition-all duration-400" />
            </Link>
          ) : (
            <div className="hidden lg:flex gap-x-[36px] items-center">
              <Link
                href="/SignIn"
                className="relative text-[18px] text-gray leading-[26px] font-bold capitalize hover:text-purple transition-all duration-300 group"
              >
                <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
                login
              </Link>
              <Link
                href="/SignUp"
                className="text-[18px] leading-[26px] font-bold capitalize rounded-[18px] py-[17px] px-[25px] purple-btn"
              >
                sing up
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsOpenBurger(!isOpenBurger)}
            className="relative flex flex-col items-center justify-center gap-2 lg:hidden z-50 w-9 h-9"
            aria-label="menu button"
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
            } header__menu fixed top-0 left-0 w-full h-full bg-white z-20 transition-all duration-500 flex flex-col items-center justify-center text-center`}
          >
            <nav>
              <ul>
                {menuList.map((item) => (
                  <li
                    key={item.id}
                    className="not-last:mb-[15px] relative group"
                  >
                    <Link
                      className="text-[18px] text-gray leading-[26px] font-inter font-medium capitalize hover:text-purple transition-all duration-300 "
                      href={`/${item.link.toLowerCase()}`}
                    >
                      {item.link}
                    </Link>
                    <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                ))}
              </ul>
            </nav>
            {token && decodedToken ? (
              <div className="mt-[15px] relative group">
                <Link
                  className="text-[18px] text-gray leading-[26px] font-inter font-medium capitalize hover:text-purple transition-all duration-300"
                  href={`/user/${decodedToken.jwtSecureCode}`}
                >
                  account
                </Link>
                <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
              </div>
            ) : (
              <div className="flex flex-col gap-x-[36px] items-center mt-15">
                <Link
                  href="/SignIn"
                  className="relative text-[18px] text-gray leading-[26px] font-bold capitalize hover:text-purple transition-all duration-300 group mb-5"
                >
                  <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
                  login
                </Link>
                <Link
                  href="/SignUp"
                  className="text-[18px] leading-[26px] font-bold capitalize rounded-[18px] py-[17px] px-[25px] purple-btn"
                >
                  sing up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
