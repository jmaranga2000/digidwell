"use client";

// app/layout.tsx
import "./globals.css";
import { ReactNode, useState } from "react";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "./dashboard/components/Sidebar";
import LightRays from "@/components/LightRays";
import { Toaster } from "sonner";

const shibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body
        className={`${shibstedGrotesk.variable} ${martianMono.variable} flex h-screen bg-background text-foreground`}
      >
        {/* Light Rays Effect */}
        <div className="absolute w-full h-[600px] top-0 left-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#3d32d4ff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        {/* Layout: Sidebar + Main */}
        <div className="flex flex-1 h-screen">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>

        {/* Global Toast Notifications */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
