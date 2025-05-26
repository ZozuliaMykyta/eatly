import Image from "next/image";
import React from "react";

const AuthBtns = () => {
  return (
    <div className="mt-[48px] flex items-center justify-center gap-5">
      <button className="auth-btn">
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
