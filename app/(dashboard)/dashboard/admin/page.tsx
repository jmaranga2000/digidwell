import { redirect } from "next/navigation";
import { syncClerkUser } from "@/lib/clerk-sync";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const user = await syncClerkUser();

  if (!user) redirect("/auth/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  return <AdminDashboard />;
}
