import React from "react";
import RestaurandCard from "./RestaurandCard";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <RestaurandCard slug={slug}></RestaurandCard>
    </div>
  );
}
