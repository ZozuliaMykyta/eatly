import React from "react";
import Link from "next/link";
import DishesCards from "./DishesCards";

const Dishes = () => {
  return (
    <section className="mt-[50px] lg:mt-[100px] custom-border-b">
      <div className="container">
        <h3 className="capitalize text-[45px] leading-[45px] text-center">
          our top <span className="text-purple">dishes</span>
        </h3>
        <DishesCards />
        <div className="text-center lg:text-right mt-[65px]">
          <Link
            className="font-medium leading-[45px] transition-all duration-300 text-[rgb(172,173,185)] hover:text-black"
            href="#!"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dishes;
