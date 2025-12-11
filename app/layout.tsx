"use client";

import "./globals.css";
import { ReactNode, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "./dashboard/components/Sidebar";
import LightRays from "@/components/LightRays";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-900 text-white font-sans">
        {/* Light Rays Effect */}
        <div className="absolute w-full h-[600px] top-0 left-0 pointer-events-none">
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
            className="custom-rays"
          />
        </div>

        {/* Sidebar + Main */}
        <div className="flex flex-1 h-screen">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}