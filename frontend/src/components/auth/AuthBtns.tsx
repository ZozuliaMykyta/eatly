"use client";
import Image from "next/image";
import React from "react";
import { oauth_google } from "./oauth_google";

const AuthBtns = () => {
  const handleRedirectGoogle = () => {
    const query = {
      client_id: oauth_google.client_id,
      redirect_uri: oauth_google.redirect_uri,
      response_type: "code",
      scope: oauth_google.scopes,
    };
    const url = new URL(oauth_google.endpoint);
    url.search = new URLSearchParams(query).toString();
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };
  return (
    <div className="mt-[48px] flex items-center justify-center gap-5">
      <button className="auth-btn" onClick={handleRedirectGoogle}>
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
