// lib/prisma.ts
import { PrismaClient } from "@/lib/generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL || "",
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
