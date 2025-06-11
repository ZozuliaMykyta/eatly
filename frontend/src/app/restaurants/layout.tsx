import type { Metadata } from "next";
// import "../globals.css";
import StoreProvider from "../StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainLayout from "../shared/MainLayout";

export const metadata: Metadata = {
  title: "Eatly",
  icons: {
    icon: "/assets/img/favicon.svg",
  },
};

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
  // return (
  //   <html lang="en">
  //     <body>
  //       <StoreProvider>
  //         <Header />
  //         <main className="flex-grow">{children}</main>
  //         <Footer />
  //       </StoreProvider>
  //     </body>
  //   </html>
  // );
}
