// lib/clerk-sync.ts
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

export type UserRole = "ADMIN" | "CUSTOMER";

/**
 * Sync a Clerk user to the local database.
 * Creates the user if it doesn't exist, or updates if it exists.
 *
 * @param userId - Clerk user ID
 */
export async function syncClerkUserToDb(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);

    // Determine role from Clerk metadata or default to CUSTOMER
    const role = (user.publicMetadata.role as UserRole) || "CUSTOMER";

    // Construct display name
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined;

    return prisma.user.upsert({
      where: { id: userId },
      update: {
        email: user.emailAddresses[0].emailAddress,
        role,
        name,
      },
      create: {
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        role,
        name,
      },
    });
  } catch (error) {
    console.error("Error syncing Clerk user to DB:", error);
    throw new Error("Failed to sync user");
  }
}