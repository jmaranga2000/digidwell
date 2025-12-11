"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Topbar() {
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

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    location.reload();
  }

  return (
    <div className="topbar">
      <div>Dashboard</div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </div>
  );
}
