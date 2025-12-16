import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function syncClerkUserToDb(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  const role = user.publicMetadata.role || "customer";

  return prisma.user.upsert({
    where: { id: userId },
    update: { email: user.emailAddresses[0].emailAddress, role },
    create: {
      id: userId,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName ?? ""}`,
      role,
    },
  });
}