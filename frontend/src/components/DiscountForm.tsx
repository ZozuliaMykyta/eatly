"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
}

const DiscountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <input type="email" />
      <button type="submit">subscribe</button>
    </form>
  );
};

export default DiscountForm;
