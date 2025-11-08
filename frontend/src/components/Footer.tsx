import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    {
      id: 1,
      link: "blog",
    },
    {
      id: 2,
      link: "pricing",
    },
    {
      id: 3,
      link: "about us",
    },
  ];

  const icons = [
    { component: FaInstagram, width: "21px", height: "21px" },
    { component: FaLinkedinIn, width: "21px", height: "20px" },
    { component: FaFacebookF, width: "10px", height: "21px" },
    { component: FaTwitter, width: "21px", height: "17px" },
  ];
  return (
    <footer className="bg-[rgb(234,234,234)] pt-[60px] pb-[36px] min-[768px]:pt-[96px] min-[768px]:pb-[80px] max-[900px]: mt-[115px]">
      <div className="container">
        <div className="flex max-[768px]:flex-col items-center justify-between gap-5 border-b-[1px] border-b-[rgb(129,129,129)] pb-[28px]">
          <Link
            className="flex items-center gap-[11px] mb-[20px] min-[768px]:mb-0"
            href="/"
          >
            <Image
              src="/assets/img/favicon.svg"
              alt="eatly"
              width={46}
              height={42}
              priority
            />
            <span className="text-[22px] leading-[130%] text-purple font-semibold">
              eatly
            </span>
          </Link>
          <form>
            <ul className="flex items-center justify-between gap-[30px] flex-col min-[768px]:flex-row min-[768px]:gap-[70px]">
              {footerLinks.map((item) => (
                <li key={item.id} className="relative group">
                  <Link
                    href={`/${item.link.toLowerCase()}`}
                    className="uppercase min-[768px]:capitalize text-[18px] leading-[27px] text-[rgb(153,153,153)] hover:text-purple transition-colors duration-300"
                  >
                    {item.link}
                  </Link>
                  <span className="absolute block w-0 h-0.5 bg-purple bottom-[-5px] left-0 transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="mt-[58px] flex flex-col-reverse min-[768px]:flex-row items-center justify-between gap-7 min-[768px]:gap-5">
          <div>
            <span className="text-[14px] min-[768px]:text-[17px] text-[rgb(153,153,153)] leading-[20px] min-[768px]:leading-[25px] font-inter">
              © 2023 EATLY All Rights Reserved.
            </span>
          </div>
          <div className="flex items-center justify-between gap-8 min-[768px]:gap-[54px]">
            {icons.map(({ component: Icon, width, height }, index) => (
              <Icon
                key={index}
                className="cursor-pointer hover:text-purple transition-all duration-300"
                style={{ width: width, height: height }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
