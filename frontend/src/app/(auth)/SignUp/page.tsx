import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative container">
        <Image
          src="/assets/img/favicon.svg"
          alt="ealty's logo"
          width={46}
          height={42}
        ></Image>
      </div>
    </>
  );
};

export default page;
