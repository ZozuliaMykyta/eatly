import type { Metadata } from "next";
import React from "react";
import MainLayout from "../shared/MainLayout";

export const metadata: Metadata = {
  title: "Eatly",
  icons: {
    icon: "/assets/img/favicon.svg",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
