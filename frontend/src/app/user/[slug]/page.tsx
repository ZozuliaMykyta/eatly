import React from "react";
import UserCard from "./UserProfile";
import Header from "@/components/Header";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <Header />
      <UserCard slug={slug}></UserCard>
    </div>
  );
}
