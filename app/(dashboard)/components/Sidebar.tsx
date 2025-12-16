"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuthUser } from "@/lib/session";

interface SidebarProps {
  open: boolean;
}

type User = {
  id: string;
  email: string;
  role: "admin" | "customer";
  name: string;
};

export default function Sidebar({ open }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const u = await getAuthUser();
      setUser(u);
    }
    fetchUser();
  }, []);

  if (!user) return null; // Don't render until user is fetched

  return (
    <aside className={`w-64 bg-gray-800 text-white ${open ? "block" : "hidden"}`}>
      <div className="p-6 font-bold text-xl">DigiDwell</div>

      <nav className="flex flex-col space-y-2 mt-6">
        <Link href="/dashboard" className="px-4 py-2 hover:bg-gray-700 rounded">
          Dashboard Home
        </Link>

        {/* Admin Links */}
        {user.role === "admin" && (
          <>
            <Link href="/dashboard/admin" className="px-4 py-2 hover:bg-gray-700 rounded">
              Admin Dashboard
            </Link>
            <Link href="/dashboard/admin/bookings" className="px-4 py-2 hover:bg-gray-700 rounded">
              Manage Bookings
            </Link>
            <Link href="/dashboard/admin/orders" className="px-4 py-2 hover:bg-gray-700 rounded">
              Orders
            </Link>
          </>
        )}

        {/* Customer Links */}
        {user.role === "customer" && (
          <>
            <Link href="/dashboard/customer" className="px-4 py-2 hover:bg-gray-700 rounded">
              My Dashboard
            </Link>
            <Link href="/dashboard/customer/bookings" className="px-4 py-2 hover:bg-gray-700 rounded">
              My Bookings
            </Link>
            <Link href="/dashboard/customer/orders" className="px-4 py-2 hover:bg-gray-700 rounded">
              My Orders
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}