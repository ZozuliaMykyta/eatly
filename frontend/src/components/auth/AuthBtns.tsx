"use client";
import Image from "next/image";
import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const AuthBtns = () => {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const result = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeResponse.code }),
      });

      const tokens = await result.json();
      console.log("Tokens and user info:", tokens);
    },
    flow: "auth-code",
  });
  return (
    <div className="mt-[48px] flex items-center justify-center gap-5">
      <button className="auth-btn" onClick={() => login()}>
        <Image
          src="/assets/img/auth/Google.svg"
          alt="google account icon"
          width={27}
          height={28}
        ></Image>
      </button>
      <button className="auth-btn">
        <Image
          src="/assets/img/auth/apple.svg"
          alt="apple id icon"
          width={26}
          height={31}
        ></Image>
      </button>
    </div>
  );
};

export default AuthBtns;
