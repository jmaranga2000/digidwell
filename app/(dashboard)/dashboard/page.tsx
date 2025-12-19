"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardRootPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/auth/login");
      return;
    }

    const role = user?.publicMetadata.role;
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/customer");
    }
  }, [isLoaded, isSignedIn, user, router]);

  return <p>Loading dashboard...</p>;
}