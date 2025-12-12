"use client";

import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import LightRays from "@/components/LightRays";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white font-sans relative overflow-x-hidden">

        {/* Background Light Rays - ALWAYS Behind Everything */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#3d32d4ff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>

        {/* Navbar ALWAYS on top */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="relative z-10">
          {children}
        </main>

        <Toaster richColors position="top-right" />

      </body>
    </html>
  );
}
