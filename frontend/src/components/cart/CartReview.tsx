"use client";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

const CartReview: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  return (
    <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 px-4 sm:px-6 lg:px-8">
      {items.length > 0 && (
        <div className="w-full max-w-[680px] text-center">
          <div className="flex justify-between items-center mb-3 sm:mb-4 custom-border-b !pb-2">
            <h6 className="text-[#323142] text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[117.5%] opacity-70">
              Subtotal
            </h6>
            <h6 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold">
              ${totalPrice}
            </h6>
          </div>
          <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6 custom-border-b !pb-2">
            <h6 className="text-[#323142] text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[117.5%] opacity-70">
              Delivery
            </h6>
            <h6 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold">
              $3.59
            </h6>
          </div>
          <div className="flex justify-between items-center mb-8 sm:mb-10 md:mb-14">
            <h4 className="text-[#323142] text-[20px] sm:text-[22px] md:text-[25px] font-semibold leading-[117.5%]">
              Total
            </h4>
            <h4 className="text-[20px] sm:text-[22px] md:text-[25px] font-semibold">
              ${(totalPrice + 3.59).toFixed(2)}
            </h4>
          </div>
          <button className="text-[#FFF3EB] font-semibold text-[16px] sm:text-[18px] md:text-[20px] purple-btn w-full rounded-[12px] sm:rounded-[15px] py-3 sm:py-3.5 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150">
            Review Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CartReview;
