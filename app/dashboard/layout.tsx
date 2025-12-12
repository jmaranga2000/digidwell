"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Topbar */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
