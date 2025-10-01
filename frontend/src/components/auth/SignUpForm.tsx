"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignUp } from "@/interfaces/IAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import AuthInputs from "./AuthInputs";

const SignUpForm = () => {
  // const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();
  const onSubmit: SubmitHandler<ISignUp> = async (data: ISignUp) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/simpleSignUp",
        data
      );

      const token = response.data.accessToken;
      console.log("Access token:", token);
      const decoded = jwtDecode<{ id: string; jwtSecureCode: string }>(token);
      console.log("Decoded JWT:", decoded);

      // const userResponse = await axios.get("http://localhost:5000/api/user", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

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
