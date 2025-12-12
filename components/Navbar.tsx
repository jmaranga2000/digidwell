"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Digidwell</div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 p-6`}
      >
        <div className="flex flex-col gap-4">
          <Link href="/" onClick={() => setSidebarOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setSidebarOpen(false)}>About</Link>
          <Link href="/services" onClick={() => setSidebarOpen(false)}>Services</Link>
          <Link href="/contact" onClick={() => setSidebarOpen(false)}>Contact</Link>
          <Link
            href="/auth/login"
            className="block px-4 py-2 rounded-lg bg-primary text-white text-center"
            onClick={() => setSidebarOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
