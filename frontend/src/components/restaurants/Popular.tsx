import React from "react";
import DishesCards from "../DishesCards";

const Popular = () => {
  return (
    <div className="container !mt-[100px] md:!mt-[150px] custom-border-b">
      <h3 className="text-[24px] sm:text-[35px] font-semibold leading-[18px] sm:leading-[25px] text-[rgb(50,49,66)]">
        Popular 🔥
      </h3>
      <DishesCards />
    </div>
  );
};

export default Popular;
