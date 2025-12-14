"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
}

interface TopbarProps {
  user?: User | null; // optional for guests
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Topbar({ user, setSidebarOpen }: TopbarProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-border">
      <div className="flex items-center gap-3">
        {setSidebarOpen && (
          <Button
            variant="outline"
            className="sm:hidden"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            ☰
          </Button>
        )}
        <span className="font-semibold text-lg">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <span className="text-sm text-muted-foreground">
            Welcome, {user.name}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">Guest</span>
        )}
      </div>
    </div>
  );
}