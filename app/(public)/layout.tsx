// app/layout.tsx
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigiDwell Technologies",
  description: "Professional Tech Services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
          
          {/* NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="pt-20">
            {children}
          </main>

          <Footer />

        </body>
      </html>
  );
}