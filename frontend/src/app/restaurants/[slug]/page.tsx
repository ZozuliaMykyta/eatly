import React from "react";
import RestaurantCard from "./RestaurantCard";
import Popular from "@/components/restaurants/Popular";
import Questions from "@/components/Questions";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <RestaurantCard slug={slug}></RestaurantCard>
      <Popular />
      <Questions />
    </div>
  );
}
