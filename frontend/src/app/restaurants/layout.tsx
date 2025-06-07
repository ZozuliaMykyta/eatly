import type { Metadata } from "next";
import "../globals.css";
import StoreProvider from "../StoreProvider";

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
          <div className="wrapper">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
