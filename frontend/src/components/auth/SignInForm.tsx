"use client";
import React, { useState } from "react";
import AuthInputs from "./AuthInputs";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "@/interfaces/IAuth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SignInForm = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>();
  const onSubmit: SubmitHandler<IAuth> = async (data: IAuth) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/simpleSignIn",
        data
      );

      const token = response.data.accessToken;
      console.log("Access token:", token);
      const decoded = jwtDecode<{ id: string; jwtSecureCode: string }>(token);
      console.log("Decoded JWT:", decoded);

      localStorage.setItem("token", token);

      router.push("user/" + decoded.jwtSecureCode);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "An error occurred");
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-[36px] gap-[24px] max-w-[382px] m-auto"
    >
      <AuthInputs
        hasName={false}
        message={message}
        register={register}
        errors={errors}
      />
      <button
        type="submit"
        className="uppercase text-[18px] font-semibold leading-[27px] rounded-[15px] purple-btn h-[74px]"
      >
        sign in
      </button>
    </form>
  );
};

export default SignInForm;
