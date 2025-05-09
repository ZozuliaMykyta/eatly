import React from "react";
import DiscountForm from "./DiscountForm";
import Image from "next/image";
import discountImage from "@/assets/img/discount-food.png";
import discountBg from "@/assets/img/icons/discount-bg.svg";

const Discount = () => {
  return (
    <section className="mb-[170px] mt-[130px] min-[768px]:mt-[220px]">
      <div className="relative container text-center min-[900px]:text-left">
        <div className="relative overflow-hidden bg-[rgb(108,95,188)] rounded-[30px] pt-[36px] pb-[60px] px-[68px]">
          <h2 className="relative z-10 uppercase text-[36px] leading-[62px] sm:text-[50px] sm:leading-[75px] min-[900px]:text-[70px] font-extrabold min-[900px]:leading-[105px] text-white mb-[9px]">
            get 50%
          </h2>
          <DiscountForm />
          <div className="hidden min-[768px]:block absolute top-[-50px] right-[20px] left-[20px] bottom-0">
            <Image src={discountBg} alt="discount background" />
          </div>
        </div>
        <Image
          className="absolute bottom-[-120px] min-[500px]:bottom-[-210px] min-[900px]:bottom-[-60px] right-[50%] max-[900px]:translate-x-[50%] min-[900px]:right-[70px] max-[500px]:w-[200px]"
          src={discountImage}
          alt="food"
        />
      </div>
    </section>
  );
};

export default Discount;
