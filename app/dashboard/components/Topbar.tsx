"use client";

import { useEffect, useState } from "react";
import { getMockSession, Session } from "@/lib/mockSession";

interface TopbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Topbar({ setSidebarOpen }: TopbarProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const s = getMockSession();
    setSession(s);
  }, []);

  return (
    <div className="topbar">
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className="btn-primary"
      >
        Toggle Sidebar
      </button>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <p className="font-semibold">{session.user.name}</p>
            <span className="pill">{session.user.role}</span>
          </>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    </div>
  );
}
