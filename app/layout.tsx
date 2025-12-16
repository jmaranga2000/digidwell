// app/layout.tsx
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono,  } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digidwell Technologies",
  description: "Professional Tech Services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-gray-50`}>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}