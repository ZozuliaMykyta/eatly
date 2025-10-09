import React from "react";
import { FaDollarSign } from "react-icons/fa";

const PricingPlans = () => {
  const features = [
    {
      id: 1,
      name: "Support 24/7",
      iconBasic: "/assets/img/pricing/check.svg",
      iconPremium: "/assets/img/pricing/none.svg",
    },
    {
      id: 2,
      name: "Fast Delivery",
      iconBasic: "/assets/img/pricing/check.svg",
      iconPremium: "/assets/img/pricing/none.svg",
    },
    {
      id: 3,
      name: "20% Off Food Deals",
      iconBasic: "/assets/img/pricing/check.svg",
      iconPremium: "/assets/img/pricing/none.svg",
    },
    {
      id: 4,
      name: "Transaction History",
      iconBasic: "/assets/img/pricing/check.svg",
      iconPremium: "/assets/img/pricing/none.svg",
    },
    {
      id: 5,
      name: "Weekend Deals",
      iconBasic: "/assets/img/pricing/none.svg",
      iconPremium: "/assets/img/pricing/none.svg",
    },
    {
      id: 6,
      name: "Dashboard Access",
      iconBasic: "/assets/img/pricing/none.svg",
      iconPremium: "/assets/img/pricing/none.svg",
    },
    {
      id: 7,
      name: "Premium Group Access",
      iconBasic: "/assets/img/pricing/none.svg",
      iconPremium: "/assets/img/pricing/none.svg",
    },
  ];
  return (
    <div className="relative rounded-[15px] bg-[#F9F9F9] pl-[66px] py-[54px] pr-[92px] mt-[66px]">
      <div
        className="absolute inset-0 -z-10"
        style={{
          borderRadius: "20.116px",
          background: "#323142",
          opacity: 0.15,
          filter: "blur(92.19711303710938px)",
        }}
      />
      <div className="flex justify-between items-center gap-10">
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
      <div className="flex justify-between items-center">
        <div className="flex-[50%]"></div>
        <div className="flex justify-between gap-12 mt-[50px] items-center flex-[52.5%]">
          <div className="flex items-center">
            <FaDollarSign className="text-[48px] text-[#272E35]" />
            <span className="text-[64px] text-[#272E35] leading-[72px]">0</span>
            <span className="font-inter text-[16px] text-[#6E757C] font-medium leading-[24px] self-end mb-2">
              /month
            </span>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="text-[48px] text-[#272E35]" />
            <span className="text-[64px] text-[#282828] leading-[72px]">5</span>
            <span className="font-inter text-[16px] text-[#6E757C] font-medium leading-[24px] self-end mb-2">
              /month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
