import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./chat.css";

export const metadata: Metadata = {
  title: "Zhihong — Personal Portfolio",
  description: "A personal portfolio for Zhihong.",
  icons: {
    icon: "/images/branding/chong-signature-monoline.png",
    apple: "/images/branding/chong-signature-monoline.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
