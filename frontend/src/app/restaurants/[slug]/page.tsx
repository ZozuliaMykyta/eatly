import React from "react";
import RestaurandCard from "./RestaurandCard";
import Popular from "@/components/restaurants/Popular";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <RestaurandCard slug={slug}></RestaurandCard>
      <Popular />
    </div>
  );
}
