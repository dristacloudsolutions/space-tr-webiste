import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Space TR — Luxury Perfume & Cosmetics Distribution",
  description:
    "Space TR is a premier distributor of luxury perfumes and cosmetics across Africa and the Indian Subcontinent, bringing the world's finest fragrance brands to emerging markets.",
  keywords: [
    "luxury perfume distributor",
    "cosmetics distribution",
    "Africa",
    "Indian Subcontinent",
    "fragrance",
    "beauty brands",
  ],
  openGraph: {
    title: "Space TR — Luxury Perfume & Cosmetics Distribution",
    description:
      "Premier distribution of luxury perfumes and cosmetics across Africa and the Indian Subcontinent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#fafafa]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
