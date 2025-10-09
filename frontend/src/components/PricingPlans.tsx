import React from "react";

const PricingPlans = () => {
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
    </div>
  );
};

export default PricingPlans;
