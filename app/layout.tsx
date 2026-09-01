import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./chat.css";

export const metadata: Metadata = {
  title: "Zhihong — Personal Portfolio",
  description: "A personal portfolio for Zhihong.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
