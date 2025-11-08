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
    console.log("🔥 SignUp form submitted with data:", data);
    setMessage("Registering..."); // Show loading state

    try {
      const { getApiBaseUrl } = await import("@/utils/api");
      const API_BASE_URL = getApiBaseUrl();
      console.log("🔥 Using API URL:", API_BASE_URL);

      const response = await axios.post(
        `${API_BASE_URL}/api/simpleSignUp`,
        data
      );

      console.log("🔥 Registration response:", response.data);

      // Registration successful, show verification message
      if (response.data.emailSent) {
        setMessage(
          "Registration successful! Please check your email to verify your account."
        );
      } else {
        setMessage(
          "Registration successful! But email verification may have failed."
        );
      }
    } catch (error) {
      console.error("🔥 Registration error:", error);
      if (axios.isAxiosError(error)) {
        console.error("🔥 Error response:", error.response?.data);
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
