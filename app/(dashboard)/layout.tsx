import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { syncClerkUser } from "@/lib/clerk-sync";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect("/auth/login");

  const user = await syncClerkUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="flex h-screen">
      <Sidebar user={user} />
      <div className="flex flex-col flex-1">
        <Topbar user={user} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
