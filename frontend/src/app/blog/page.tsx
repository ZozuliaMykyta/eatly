import Articles from "@/components/blog/Articles";
import Discount from "@/components/Discount";
import Questions from "@/components/Questions";
import React from "react";

const page = () => {
  return (
    <>
      <Discount uniqueMargin={true} />
      <Articles />
      <Questions />
    </>
  );
};

export default page;
