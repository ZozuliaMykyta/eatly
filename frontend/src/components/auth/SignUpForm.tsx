"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "@/interfaces/IAuth";
import axios from "axios";
import AuthInputs from "./AuthInputs";

const SignUpForm = () => {
  const [message, setMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>();
  const onSubmit: SubmitHandler<IAuth> = async (data: IAuth) => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
      const response = await axios.post(
        `${API_BASE_URL}/api/simpleSignUp`,
        data
      );

      // Registration successful, show verification message
      if (response.data.emailSent) {
        setMessage(
          "Registration successful! Please check your email to verify your account."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "An error occurred");
      } else {
        setMessage("An unknown error occurred");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-[36px] gap-[24px] max-w-[382px] m-auto"
    >
      <AuthInputs
        hasName={true}
        message={message}
        register={register}
        errors={errors}
      />
      <button
        type="submit"
        className="uppercase text-[18px] font-semibold leading-[27px] rounded-[15px] purple-btn h-[74px]"
      >
        sign up
      </button>
    </form>
  );
};

export default SignUpForm;
