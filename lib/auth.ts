import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { prisma } from "./prisma";

export async function getAuthUser() {
  const token = cookies().get("token")?.value;

  if (!token) return null;

  const decoded: any = verifyToken(token);
  if (!decoded) return null;

  return prisma.user.findUnique({ where: { id: decoded.id } });
}
