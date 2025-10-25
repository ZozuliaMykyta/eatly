import CartProducts from "@/components/cart/CartProducts";
import CartReview from "@/components/cart/CartReview";
import Discount from "@/components/Discount";
import React from "react";

const page = () => {
  return (
    <div className="container">
      <CartProducts />
      <CartReview />
      <Discount />
    </div>
  );
};

export default page;
