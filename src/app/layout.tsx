import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SectionProviderForAllApp from "@/components/provider";
import Navbar from "@/components/Navbar";
import NavbarController from "@/components/NavbarController";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BoostNest | Home",
  description: "if you need youtube services , we cat provide every services youtube or others social media services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <SectionProviderForAllApp>
          <Navbar></Navbar>
          {children}
        </SectionProviderForAllApp>
      </body>
    </html>
  );
}
