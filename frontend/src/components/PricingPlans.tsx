"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import blackArrow from "@/assets/img/icons/black-arrow.svg";

const PricingPlans = () => {
  const [isWide, setIsWide] = useState<boolean>(false);
  const [isFeatureOpened, setIsFeatureOpened] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => setIsWide(window.innerWidth > 1024);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const toggleFeature = () => setIsFeatureOpened((prev) => !prev);

  const features = [
    {
      id: 1,
      name: "Support 24/7",
      iconBasic: "/assets/img/pricing/check.svg",
      iconPremium: "/assets/img/pricing/check.svg",
    },
    {
      id: 2,
      name: "Fast Delivery",
      iconBasic: "/assets/img/pricing/check.svg",
      iconPremium: "/assets/img/pricing/check.svg",
    },
    {
      id: 3,
      name: "20% Off Food Deals",
      iconBasic: "/assets/img/pricing/check.svg",
      iconPremium: "/assets/img/pricing/check.svg",
    },
    {
      id: 4,
      name: "Transaction History",
      iconBasic: "/assets/img/pricing/check.svg",
      iconPremium: "/assets/img/pricing/check.svg",
    },
    {
      id: 5,
      name: "Weekend Deals",
      iconBasic: "/assets/img/pricing/none.svg",
      iconPremium: "/assets/img/pricing/check.svg",
    },
    {
      id: 6,
      name: "Dashboard Access",
      iconBasic: "/assets/img/pricing/none.svg",
      iconPremium: "/assets/img/pricing/check.svg",
    },
    {
      id: 7,
      name: "Premium Group Access",
      iconBasic: "/assets/img/pricing/none.svg",
      iconPremium: "/assets/img/pricing/check.svg",
    },
  ];
  return (
    <div>
      {isWide ? (
        <div className="relative rounded-[15px] bg-lighwhite pl-[66px] py-[54px] pr-[92px] mt-[66px]">
          <div
            className="absolute inset-0 -z-10"
            style={{
              borderRadius: "20.116px",
              background: "#323142",
              opacity: 0.15,
              filter: "blur(92.19711303710938px)",
            }}
          />
          <div className="flex justify-between items-center gap-10 mb-[40px]">
            <div className="flex-[47.5%]">
              <h2 className="text-[40px] text-[#282828] leading-[120%] mb-[25px]">
                Pricing
              </h2>
              <h6 className="text-[#6E757C] text-[16px] font-inter font-medium leading-[24px]">
                Affordable Basic& Pro Plans
              </h6>
            </div>
            <div className="flex justify-between items-center gap-12 flex-[52.5%]">
              <div>
                <h3 className="text-[35px] text-[#282828] leading-[120%] mb-[30px]">
                  Basic
                </h3>
                <h6 className="text-[#6E757C] text-[16px] font-inter font-medium leading-[24px]">
                  Completely 100% Free Plan
                </h6>
              </div>
              <div>
                <h3 className="text-[35px] text-[#282828] leading-[120%] mb-[30px]">
                  Premium
                </h3>
                <h6 className="text-[#6E757C] text-[16px] font-inter font-medium leading-[24px]">
                  Amazing Premium Features Plan
                </h6>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center border-[#CBCBCB] border-t-1 border-b-1 py-[40px]">
            <div className="flex-[50%]"></div>
            <div className="flex gap-12 flex-[52.5%] justify-start">
              <div className="flex items-center flex-[50%]">
                <FaDollarSign className="text-[48px] text-[#272E35]" />
                <span className="text-[64px] text-[#272E35] leading-[72px]">
                  0
                </span>
                <span className="font-inter text-[16px] text-[#6E757C] font-medium leading-[24px] self-end mb-2">
                  /month
                </span>
              </div>
              <div className="flex items-center flex-[50%]">
                <FaDollarSign className="text-[48px] text-[#272E35]" />
                <span className="text-[64px] text-[#282828] leading-[72px]">
                  5
                </span>
                <span className="font-inter text-[16px] text-[#6E757C] font-medium leading-[24px] self-end mb-2">
                  /month
                </span>
              </div>
            </div>
          </div>
          <div className="mt-[50px] pb-[64px] border-[#CBCBCB] border-b-1">
            <h4 className="mb-[50px] text-[24px] leading-[32px] text-[#272E35]">
              Core features
            </h4>
            <div className="flex justify-between items-center gap-10 mt-[50px]">
              <div className="flex-[47.5%]">
                {features.map((feature) => (
                  <h3
                    key={feature.id}
                    className="text-[#606060] text-[22px] font-medium leading-[32px] not-last:mb-[39px]"
                  >
                    {feature.name}
                  </h3>
                ))}
              </div>
              <div className="flex justify-between items-center gap-12 flex-[52.5%]">
                <div className="flex flex-col flex-[50%]">
                  {features.map((feature) => (
                    <Image
                      key={feature.id}
                      src={feature.iconBasic}
                      alt={feature.name}
                      width={35}
                      height={35}
                      className="not-last:mb-[35px]"
                    />
                  ))}
                </div>
                <div className="flex flex-col flex-[50%]">
                  {features.map((feature) => (
                    <Image
                      key={feature.id}
                      src={feature.iconPremium}
                      alt={feature.name}
                      width={35}
                      height={35}
                      className="not-last:mb-[35px]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mt-[44px]">
              <div className="flex-[50%]"></div>
              <div className="flex gap-12 flex-[52.5%] justify-start">
                <div className="flex items-center flex-[50%]">
                  <button className="text-[16px] font-medium leading-[0.488px] purple-btn rounded-xl py-7 px-6">
                    start free
                  </button>
                </div>
                <div className="flex items-center flex-[50%]">
                  <button className="text-[16px] font-medium leading-[0.488px] purple-btn rounded-xl py-7 px-6">
                    start Pro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-[58px]">
          <div className="relative rounded-[15px] bg-lighwhite pl-[24px] py-[30px] pr-[28px]">
            <div
              className="absolute inset-0 -z-10"
              style={{
                borderRadius: "20.116px",
                background: "#323142",
                opacity: 0.15,
                filter: "blur(92.19711303710938px)",
              }}
            />
            <h3 className="text-[26px] text-[#282828] leading-[120%] mb-[17px]">
              Basic
            </h3>
            <div className="flex items-center border-[#CBCBCB] border-b-1 pb-4">
              <FaDollarSign className="text-[32px] text-[#272E35]" />
              <span className="text-[45px] text-[#272E35] leading-[72px]">
                0
              </span>
              <span className="font-inter text-[11px] text-[#6E757C] font-medium leading-[17px] self-end mb-4">
                /month
              </span>
            </div>
            <h6 className="mt-6 font-inter text-[11px] font-medium leading-[17px] text-[#6E757C]">
              Completely 100%
              <br /> Free Plan
            </h6>
            <button className="text-[11px] sm:text-[16px] font-medium leading-[0.347px] sm:leading-[0.488px] purple-btn rounded-xl py-6 px-6 mt-[16px]">
              start free
            </button>
            <div className="flex items-center mt-[32px] gap-2.5">
              <button
                onClick={toggleFeature}
                className="text-[#272E35] font-inter text-[13px] sm:text-[16px] leading-5 font-bold"
              >
                See features
              </button>
              <Image
                className={`${
                  isFeatureOpened ? "rotate-180" : ""
                } transition-transform duration-300`}
                src={blackArrow}
                alt="Arrow"
                width={12}
                height={8}
              />
            </div>
            <div>
              {isFeatureOpened && (
                <div className="mt-6">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center gap-3 not-last:mb-3"
                    >
                      <Image
                        src={feature.iconBasic}
                        alt={feature.name}
                        width={18}
                        height={18}
                      />
                      <p className="text-[11px] sm:text-[16px] font-medium leading-[17px] sm:leading-[24px] text-[#606060]">
                        {feature.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <div className="relative rounded-[15px] bg-lighwhite pl-[24px] py-[30px] pr-[28px]">
              <div
                className="absolute inset-0 -z-10"
                style={{
                  borderRadius: "20.116px",
                  background: "#323142",
                  opacity: 0.15,
                  filter: "blur(92.19711303710938px)",
                }}
              />
              <h3 className="text-[26px] text-[#282828] leading-[120%] mb-[17px]">
                Premium
              </h3>
              <div className="flex items-center border-[#CBCBCB] border-b-1 pb-4">
                <FaDollarSign className="text-[32px] text-[#272E35]" />
                <span className="text-[45px] text-[#272E35] leading-[72px]">
                  5
                </span>
                <span className="font-inter text-[11px] text-[#6E757C] font-medium leading-[17px] self-end mb-4">
                  /month
                </span>
              </div>
              <h6 className="mt-6 font-inter text-[11px] font-medium leading-[17px] text-[#6E757C]">
                Amazing Premium
                <br /> Features Plan
              </h6>
              <button className="text-[11px] sm:text-[16px] font-medium leading-[0.347px] sm:leading-[0.488px] purple-btn rounded-xl py-6 px-6 mt-[16px]">
                start Pro
              </button>
              <div className="flex items-center mt-[32px] gap-2.5">
                <button
                  onClick={toggleFeature}
                  className="text-[#272E35] font-inter text-[13px] sm:text-[16px] leading-5 font-bold"
                >
                  See features
                </button>
                <Image
                  className={`${
                    isFeatureOpened ? "rotate-180" : ""
                  } transition-transform duration-300`}
                  src={blackArrow}
                  alt="Arrow"
                  width={12}
                  height={8}
                />
              </div>
              <div>
                {isFeatureOpened && (
                  <div className="mt-6">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center gap-3 not-last:mb-3"
                      >
                        <Image
                          src={feature.iconPremium}
                          alt={feature.name}
                          width={18}
                          height={18}
                        />
                        <p className="text-[11px] sm:text-[16px] font-medium leading-[17px] sm:leading-[24px] text-[#606060]">
                          {feature.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPlans;
