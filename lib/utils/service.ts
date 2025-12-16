import prisma from "../prisma";

export async function createService(data: {
  title: string;
  description?: string;
  price?: string;
  categoryId?: string;
  createdById: string;
}) {
  return prisma.service.create({ data });
}

export async function listServices() {
  return prisma.service.findMany({
    include: { category: true, createdBy: true },
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}