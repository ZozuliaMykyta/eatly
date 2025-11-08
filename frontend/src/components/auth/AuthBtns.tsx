"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const AuthBtns = () => {
  const router = useRouter();
  return (
    <div className="mt-[48px]">
      <button
        className="w-full bg-[rgb(245,245,245)] rounded-[13px] text-center flex justify-center items-center flex-col cursor-pointer py-[16px] transition-all duration-300 border-2 border-[rgb(245,245,245)] hover:border-black focus:border-purple focus:outline-none"
        onClick={async () => {
          const { getApiBaseUrl } = await import("@/utils/api");
          const API_BASE_URL = getApiBaseUrl();
          router.push(`${API_BASE_URL}/api/auth/google`);
        }}
      >
        <Image
          src="/assets/img/auth/Google.svg"
          alt="google account icon"
          width={27}
          height={28}
        ></Image>
      </button>
    </div>
  );
};

export default AuthBtns;
