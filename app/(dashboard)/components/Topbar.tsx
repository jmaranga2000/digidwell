"use client";

import { useEffect, useState } from "react";
import { getAuthUser } from "@/lib/session";

interface TopbarProps {
  user?: { name: string; role: string };
}

export default function Topbar({ user: initialUser }: TopbarProps) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    async function fetchUser() {
      if (!initialUser) {
        const u = await getAuthUser();
        setUser(u);
      }
    }
    fetchUser();
  }, [initialUser]);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-lg font-semibold">Welcome, {user?.name || "User"}!</div>
      <div>
        <span className="text-sm text-gray-600 mr-4 capitalize">{user?.role}</span>
        <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">
          Logout
        </button>
      </div>
    </header>
  );
}