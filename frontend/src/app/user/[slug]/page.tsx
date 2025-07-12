import React from "react";
import UserCard from "./UserProfile";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <UserCard slug={slug}></UserCard>
    </div>
  );
}
