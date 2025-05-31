"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const AuthBtns = () => {
  const router = useRouter();
  return (
    <div className="mt-[48px] flex items-center justify-center gap-5">
      <button
        className="auth-btn"
        onClick={() => router.push("http://localhost:5000/api/auth/google")}
      >
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
