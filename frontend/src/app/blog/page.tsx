import Articles from "@/components/blog/Articles";
import Discount from "@/components/Discount";
import React from "react";

const page = () => {
  return (
    <>
      <Discount uniqueMargin={true} />
      <Articles />
    </>
  );
};

export default page;
