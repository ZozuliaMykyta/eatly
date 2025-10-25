import CartProducts from "@/components/cart/CartProducts";
import Discount from "@/components/Discount";
import React from "react";

const page = () => {
  return (
    <div className="container">
      <CartProducts />
      <Discount />
    </div>
  );
};

export default page;
