import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getSession();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar open={true} user={user} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar user={user} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}