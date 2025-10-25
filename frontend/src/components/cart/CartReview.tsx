"use client";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

const CartReview: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  return (
    <div className="flex justify-center mt-12">
      {items.length > 0 && (
        <div className="w-full max-w-[680px] text-center">
          <div className="flex justify-between items-center mb-4 custom-border-b !pb-2">
            <h6 className="text-[#323142] text-[20px] font-normal leading-[117.5%] opacity-70">
              Subtotal
            </h6>
            <h6>${totalPrice}</h6>
          </div>
          <div className="flex justify-between items-center mb-6 custom-border-b !pb-2">
            <h6 className="text-[#323142] text-[20px] font-normal leading-[117.5%] opacity-70">
              Delivery
            </h6>
            <h6>$3.59</h6>
          </div>
          <div className="flex justify-between items-center">
            <h4 className="text-[#323142] text-[25px] font-semibold leading-[117.5%]">
              Total
            </h4>
            <h4>${(totalPrice + 3.59).toFixed(2)}</h4>
          </div>
          <button className="mt-14 text-[#FFF3EB] font-semibold text-[20px] purple-btn w-full rounded-[15px] py-3">
            Review Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CartReview;
