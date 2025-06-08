import type { Metadata } from "next";
import "../globals.css";
import StoreProvider from "../StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Eatly",
  icons: {
    icon: "/assets/img/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
