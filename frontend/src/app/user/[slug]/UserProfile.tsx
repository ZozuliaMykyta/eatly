"use client";
import { useGetUserQuery } from "@/lib/services/api";
import React from "react";

const UserCard = ({ slug }: { slug: string }) => {
  const { data, error, isLoading } = useGetUserQuery();
  const user = data?.find((item) => item.jwtSecureCode === slug);

  if (isLoading) {
    return (
      <div className="container text-center">
        <h5 className="mt-5">Loading..</h5>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container text-center">
        <h5 className="mt-5">Something went wrong</h5>
      </div>
    );
  }
  if (!user) {
    return <div>User not found</div>;
  }
  return <div>{user.fullName}</div>;
};

export default UserCard;
