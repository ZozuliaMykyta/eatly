import type { Metadata } from "next";
import { Poppins, Inter, Manrope, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StoreProvider from "./StoreProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Eatly",
  icons: {
    icon: "/assets/img/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${manrope.variable} ${roboto.variable} font-poppins font-semibold`}
      >
        <StoreProvider>
          <div className="wrapper">
            <Header />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
