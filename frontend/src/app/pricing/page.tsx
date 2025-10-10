import Customer from "@/components/Customer";
import PricingPlans from "@/components/PricingPlans";
import React from "react";

const page = () => {
  return (
    <div className="container">
      <PricingPlans />
      <Customer />
    </div>
  );
};

export default page;
