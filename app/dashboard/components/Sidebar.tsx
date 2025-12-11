"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
}

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
    fetchSession();
  }, []);

  return (
    <div className={`sidebar ${open ? "block" : "hidden"}`}>
      <div className="mb-6">
        {user ? (
          <div>
            <p className="font-semibold">Hello, {user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        ) : (
          <p className="font-semibold">Guest</p>
        )}
      </div>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/services">Services</Link>
        <Link href="/dashboard/bookings">Bookings</Link>
        <Link href="/dashboard/customers">Customers</Link>

        {user && (
          <Button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              setUser(null);
              location.reload();
            }}
            className="mt-4"
          >
            Logout
          </Button>
        )}
      </nav>
    </div>
  );
}
