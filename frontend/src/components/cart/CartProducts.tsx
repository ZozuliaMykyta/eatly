"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import {
  decrementQuantity,
  deleteProduct,
  incrementQuantity,
} from "@/lib/cart/cartSlice";
import { IoTrashBinOutline } from "react-icons/io5";

const CartProducts: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-center w-full mt-10">
      <div className="w-full max-w-[680px]">
        {items.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li
                key={item._id}
                className="bg-white rounded-[12px] w-full flex justify-between items-center pl-1 py-3 pr-10 not-first:mt-6"
                style={{
                  boxShadow: "0 19.942px 29.913px 0 rgba(70, 70, 70, 0.10)",
                }}
              >
                <div className="flex justify-center items-center gap-3.5">
                  <div className="w-[100px] h-[100px] relative overflow-hidden rounded-lg">
                    <Image
                      fill
                      src={item.image}
                      alt={item.title}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#323142] text-[22px] leading-[140%] mb-1 font-semibold">
                      {item.title}
                    </h4>
                    <h6 className="text-[#323142] text-[18px] leading-[140%] font-semibold">
                      ${item.price}
                    </h6>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="border-[1.25px] border-solid border-[#323142] rounded-[10px] px-2.5 py-1 cursor-pointer"
                        onClick={() => dispatch(decrementQuantity(item._id))}
                      >
                        -
                      </button>
                      <span className="text-[#323142] text-[18px] font-normal leading-[140% ]">
                        {item.quantity}
                      </span>
                      <button
                        className="border-[1.25px] border-solid border-[#323142] rounded-[10px] px-2.5 py-1 cursor-pointer"
                        onClick={() => dispatch(incrementQuantity(item._id))}
                      >
                        +
                      </button>
                    </div>
                    <h6 className="text-[16px] font-semibold text-[#323142] leading-[140%] mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h6>
                  </div>
                  <IoTrashBinOutline
                    className="cursor-pointer text-red-800 text-[28px]"
                    onClick={() => dispatch(deleteProduct(item._id))}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartProducts;
