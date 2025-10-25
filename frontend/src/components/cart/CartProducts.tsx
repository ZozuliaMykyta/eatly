"use client";
import React from "react";
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
    <div className="flex justify-center w-full mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[680px]">
        {items.length === 0 ? (
          <p className="text-center text-base sm:text-lg text-gray-600">
            Your cart is empty
          </p>
        ) : (
          <ul className="relative">
            <Image
              src="/assets/img/questions-lines.svg"
              alt="decoration"
              width={41}
              height={39}
              className="absolute top-[-20px] sm:top-[-30px] md:top-[-45px] right-[-15px] sm:right-[-25px] md:right-[-40px] w-[15px] h-[14px] sm:w-[20px] sm:h-[19px] md:w-[41px] md:h-[39px]"
            ></Image>
            {items.map((item) => (
              <li
                key={item._id}
                className="bg-white rounded-[8px] sm:rounded-[12px] w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:pl-1 sm:py-3 sm:pr-6 md:pr-10 not-first:mt-4 sm:not-first:mt-6"
                style={{
                  boxShadow: "0 19.942px 29.913px 0 rgba(70, 70, 70, 0.10)",
                }}
              >
                <div className="flex items-center gap-2 sm:gap-3.5 w-full sm:w-auto">
                  <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] relative overflow-hidden rounded-lg flex-shrink-0">
                    <Image
                      fill
                      src={item.image}
                      alt={item.title}
                      className="object-cover"
                      sizes="(max-width: 640px) 70px, (max-width: 768px) 80px, 100px"
                    />
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="text-[#323142] text-[16px] sm:text-[18px] md:text-[22px] leading-[140%] mb-1 font-semibold line-clamp-2 sm:line-clamp-none">
                      {item.title}
                    </h4>
                    <h6 className="text-[#323142] text-[14px] sm:text-[16px] md:text-[18px] leading-[140%] font-semibold">
                      ${item.price}
                    </h6>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 mt-3 sm:mt-0">
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="border-[1.25px] border-solid border-[#323142] rounded-[8px] sm:rounded-[10px] px-2 py-1 sm:px-2.5 sm:py-1 cursor-pointer text-sm sm:text-base hover:bg-gray-50 transition-colors"
                        onClick={() => dispatch(decrementQuantity(item._id))}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-[#323142] text-[16px] sm:text-[18px] font-normal leading-[140%] min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="border-[1.25px] border-solid border-[#323142] rounded-[8px] sm:rounded-[10px] px-2 py-1 sm:px-2.5 sm:py-1 cursor-pointer text-sm sm:text-base hover:bg-gray-50 transition-colors"
                        onClick={() => dispatch(incrementQuantity(item._id))}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <h6 className="text-[14px] sm:text-[16px] font-semibold text-[#323142] leading-[140%] mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h6>
                  </div>
                  <IoTrashBinOutline
                    className="cursor-pointer text-red-800 text-[24px] sm:text-[28px] hover:text-red-900 transition-colors"
                    onClick={() => dispatch(deleteProduct(item._id))}
                    aria-label="Remove item from cart"
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
