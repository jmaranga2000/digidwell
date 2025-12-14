"use client";

import { ReactNode, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { getAuthUser } from "@/lib/session";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      const authUser = await getAuthUser();
      if (!authUser) redirect("/auth/login");
      if (authUser.role !== "admin") redirect("/dashboard");
      setUser(authUser);
    }
    loadUser();
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} user={user} />

      <div className="flex flex-col flex-1 ml-64">
        <Topbar user={user} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}