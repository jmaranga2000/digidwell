"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { FiHome, FiUser, FiSettings, FiLogOut, FiLogIn } from "react-icons/fi";

interface User {
  id: string;
  name: string;
  email: string;
}

interface SidebarProps {
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  user?: User | null;
}

export default function Sidebar({ open, setOpen, user }: SidebarProps) {
  // Define menu items based on login status
  const guestMenu = [
    { title: "Login", icon: <FiLogIn />, href: "/auth/login" },
    { title: "Register", icon: <FiUser />, href: "/auth/register" },
  ];

  const userMenu = [
    { title: "Dashboard", icon: <FiHome />, href: "/dashboard" },
    { title: "Profile", icon: <FiUser />, href: "/dashboard/profile" },
    { title: "Settings", icon: <FiSettings />, href: "/dashboard/settings" },
    { title: "Logout", icon: <FiLogOut />, href: "/auth/logout" },
  ];

  const menuItems = user ? userMenu : guestMenu;

  return (
    <aside
      className={`fixed z-30 inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:inset-0`}
    >
      <div className="flex flex-col h-full">
        {/* Logo / Branding */}
        <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
          DigiDwell
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => setOpen && setOpen(false)} // close sidebar on mobile
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Optional Footer */}
        <div className="px-4 py-4 border-t border-gray-700 text-sm text-gray-400">
          {user ? `Logged in as ${user.name}` : "Guest"}
        </div>
      </div>
    </aside>
  );
}