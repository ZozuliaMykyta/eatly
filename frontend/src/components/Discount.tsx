import React from "react";
import DiscountForm from "./DiscountForm";

const Discount = () => {
  return (
    <section>
      <div className="container">
        <div>
          <h2 className="uppercase">get 50%</h2>
          <DiscountForm />
        </div>
      </div>
    </section>
  );
};

export default Discount;
