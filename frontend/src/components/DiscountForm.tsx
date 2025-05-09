"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
}

const DiscountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data);

  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsWide(window.innerWidth > 600);
    checkWidth();
    addEventListener("resize", checkWidth);
    return () => removeEventListener("resize", checkWidth);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex gap-2 mb-[50px] z-10 justify-center min-[900px]:justify-start"
    >
      <div className="flex flex-col">
        <div className="relative">
          <input
            className="focus:outline-purple w-[250px] min-[500px]:w-[400px] bg-white pl-3.5 min-[500px]:pl-[22px] py-4 min-[500px]:py-[22px] pr-[110px] min-[500px]:pr-[140px] rounded-[14px] text-[10px] min-[500px]:text-[16px] font-normal text-black leading-6 tracking-[3%] placeholder:capitalize placeholder:text-[rgb(135,135,135)]"
            style={{ boxShadow: "0px 7.25px 45.33px 0px rgba(0, 0, 0, 0.1)" }}
            type="email"
            placeholder={isWide ? "enter your email address" : "email address"}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <button
            type="submit"
            className="focus:outline-purple absolute translate-y-[-50%] top-[50%] right-1.5 cursor-pointer text-[10px] min-[500px]:text-[14px] leading-[14px] min-[500px]:leading-[22px] text-[rgb(247,248,250)] py-2.5 min-[500px]:py-4 px-4 min-[500px]:px-6 rounded-[11px] bg-purple"
          >
            subscribe
          </button>
        </div>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
    </form>
  );
};

export default DiscountForm;
