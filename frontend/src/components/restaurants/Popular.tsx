import React from "react";
import DishesCards from "../DishesCards";

const Popular = () => {
  return (
    <div className="container !mt-[150px]">
      <h3 className="text-[35px] font-semibold leading-[25px] text-[rgb(50,49,66)]">
        Popular 🔥
      </h3>
      <DishesCards />
    </div>
  );
};

export default Popular;
