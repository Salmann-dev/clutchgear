import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClutchGear | Precision Gaming Peripherals",
  description:
    "High-performance esports peripherals engineered with ultra-light unibodies, 4000Hz polling rate, and true 1:1 optical tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-canvas text-text-primary selection:bg-accent/20 selection:text-accent">
        {children}
      </body>
    </html>
  );
}
