"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center space-x-3">
        <Link href="/" className="flex-shrink-0 text-2xl font-bold text-gray-900">
        <Image src="/logo.jpg" alt="logo" width={34}  height={34} />
          Digidwell
        </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <Link href="/services" className="hover:text-black transition">Services</Link>
          <Link href="/contact" className="hover:text-black transition">Contact</Link>
          <Link href="/blog" className="hover:text-black transition">Blog</Link>
           <Link href="/about" className="hover:text-black transition">About</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition">
                Login
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition">
                Register
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Button */}
        <Button onClick={() => setOpen(!open)} className="md:hidden text-gray-600">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow px-6 py-4 space-y-4">
          <Link href="/" onClick={() => setOpen(false)} className="block text-gray-800 text-lg">Home</Link>
          <Link href="/services" onClick={() => setOpen(false)} className="block text-gray-800 text-lg">Services</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block text-gray-800 text-lg">Contact</Link>
          <Link href="/blog" onClick={() => setOpen(false)} className="block text-gray-800 text-lg">Blog</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block text-gray-800 text-lg">About</Link>


          <div className="pt-4 border-t">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100">
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="mt-3 w-full bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900">
                  Register
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}