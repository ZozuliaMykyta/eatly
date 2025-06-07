import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
