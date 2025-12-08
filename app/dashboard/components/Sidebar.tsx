"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMockSession } from "@/lib/mockSession";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [session, setSession] = useState<{ user: { name: string; email: string }; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const s = getMockSession();
    setSession(s);
  }, []);

  const handleLogout = () => {
    // For mock session, just clear it
    setSession(null);
    router.push("/");
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        {session && (
          <div className="mb-6">
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-sm text-gray-400">{session.user.email}</p>
          </div>
        )}

        <nav className="space-y-2">
          <Link href="/dashboard/customer">
            <a className="block px-2 py-1 rounded hover:bg-gray-700">Customer Dashboard</a>
          </Link>
          <Link href="/dashboard/admin">
            <a className="block px-2 py-1 rounded hover:bg-gray-700">Admin Dashboard</a>
          </Link>
        </nav>

        {session && (
          <Button
            className="mt-6 w-full bg-red-600 hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
