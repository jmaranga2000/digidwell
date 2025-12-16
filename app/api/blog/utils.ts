import { auth, currentUser } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return userId;
}